const Project = require("../models/project");
const User = require("../models/user");
const Task = require("../models/task");

async function createProject(req, res) {
    const project = new Project({
        ...req.body,
        owner: req.user._id,
        members: [req.user._id]
    });

    try {
        const validationError = await project.validate();
        if (validationError) {
            throw new Error(validationError);
        }

        await project.save();
        res.status(201).send(project);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

async function getProjects(req, res) {
    try {
        await User.populate(req.user, { path: "projects" });
        res.status(200).send(req.user.projects);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

async function getProjectById(req, res) {
    try {
        const project = await Project.populate(req.project, [
            {
                path: "members owner",
                select: "-password -email -phone -projects"
            },
            {
                path: "tasks",
                select: "-description -project",
                populate: {
                    path: "assignee",
                    select: "-password -email -phone -projects"
                }
            }
        ]);
        res.status(200).send(project);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

async function updateProjectById(req, res) {
    const updatableKeys = ["description", "title", "owner"];
    const fieldsToUpdate = Object.keys(req.body);

    try {
        const isUpdatable = fieldsToUpdate.every(key =>
            updatableKeys.includes(key)
        );
        if (!isUpdatable) {
            throw new Error("Invalid updates");
        }

        if (fieldsToUpdate.includes("owner")) {
            const memberId = req.body.owner;
            const isMember = req.project.members.includes(memberId);
            if (!isMember) {
                throw new Error("User is not a member");
            }

            const isOwner =
                req.project.owner.toString() === memberId.toString();
            if (isOwner) {
                throw new Error("You cant change owner to yourself as owner");
            }
        }

        await Project.updateOne(
            { _id: req.params.project_id },
            { $set: req.body },
            { runValidators: true }
        );
        res.status(200).send({ message: "Successfully updated" });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

async function removeProjectById(req, res) {
    try {
        await Project.deleteOne({ _id: req.params.project_id });
        res.status(200).send({ message: "Project is successfully removed" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

async function addMemberToProject(req, res) {
    const memberId = req.body.id;
    const projectId = req.params.project_id;

    try {
        const count = await User.findById(memberId);
        if (!count) {
            throw new Error("User doesnt exist");
        }

        const isMember = req.project.members.includes(memberId);
        if (isMember) {
            throw new Error("User is a member");
        }

        await Project.updateOne(
            { _id: projectId },
            {
                $addToSet: { members: memberId }
            }
        );

        await User.updateOne(
            { _id: memberId },
            {
                $addToSet: { projects: projectId }
            }
        );

        return res.status(200).send({
            message: "Member is successfully added to the project"
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

async function removeMemberFromProject(req, res) {
    const memberId = req.body.id;
    const projectId = req.params.project_id;

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            throw new Error("Project not found");
        }

        const isMemberExist = project.members.includes(memberId);
        if (!isMemberExist) {
            throw new Error("Member doesnt exist in this project");
        }

        const isOwner = req.user._id.toString() === project.owner.toString();
        const isRemoveMyself = req.user._id.toString() === memberId.toString();
        //XOR operator - u can either remove other as owner or yourself as member
        if (isOwner ? isRemoveMyself : !isRemoveMyself) {
            throw new Error("The action is not allowed");
        }

        await Project.updateOne(
            { _id: projectId },
            {
                $pull: { members: memberId }
            }
        );

        await User.findOne(
            { _id: memberId },
            {
                $pull: { projects: projectId }
            }
        );

        res.status(200).send({
            message: "Member is successfully removed from the project"
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

async function addTaskToProject(req, res) {
    const task = new Task({
        ...req.body,
        project: req.project._id
    });

    try {
        const validationError = await task.validate();
        if (validationError) {
            throw new Error(validationError);
        }

        await task.save();
        res.status(200).send({ message: "Task is successfully created" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProjectById,
    removeProjectById,
    addMemberToProject,
    removeMemberFromProject,
    addTaskToProject
};
