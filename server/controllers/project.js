const Project = require("../models/project");
const User = require("../models/user");

async function createProject(req, res) {
    const project = new Project({
        ...req.body,
        owner: req.user._id
    });
    try {
        await project.save();
        const user = req.user;
        user.projects.push(project);
        await user.save();
        res.status(200).send(project);
    } catch (err) {
        res.status(400).send(err);
    }
}

async function getProjects(req, res) {
    try {
        await User.populate(req.user, { path: "projects" });
        res.status(200).send(req.user.projects);
    } catch (err) {
        res.status(400).send(err);
    }
}

async function getProjectById(req, res) {
    try {
        const isProjectAccessible = (req.user.projects || []).includes(
            req.params.id
        );
        if (!isProjectAccessible) {
            throw "Project is unavailable";
        }

        const project = await Project.findById(req.params.id);
        if (!project){
            throw "Project not found"
        }
        res.status(200).send(project);
    } catch (err) {
        res.status(400).send({err});
    }
}

async function updateProjectById(req, res) {
    const updatableKeys = ["description"];
    try {
        const isUpdatable = Object.keys(req.body).every(key =>
            updatableKeys.includes(key)
        );
        if (!isUpdatable) {
            throw "Invalid updates";
        }

        await Project.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ message: "Successfully updated" });
    } catch (err) {
        res.status(400).send({err});
    }
}

async function removeProjectById(req, res) {
    try {
        const projectId = req.params.id;
        const project = await Project.findByIdAndDelete(projectId);
        const projectUsersIds = [...project.members, project.owner];

        User.updateMany(
            { _id: { $in: projectUsersIds } },
            { $pull: { projects: projectId } }
        ).exec();

        res.status(200).send({ message: "Project is successfully removed" });
    } catch (err) {
        res.status(400).send(err);
    }
}

async function addMemberToProject(req, res) {
    try {
        const memberId = req.body.id;
        const projectId = req.params.id;

        const count = await User.countDocuments({ _id: memberId });
        if (!count) {
            throw "User doesnt exist";
        }

        const isMember = req.project.members.includes(memberId);
        if (isMember) {
            throw "User is a member";
        }

        await Project.findByIdAndUpdate(projectId, {
            $addToSet: { members: memberId }
        });
        await User.findByIdAndUpdate(memberId, {
            $addToSet: { projects: projectId }
        });
        return res.status(200).send({
            message: "Member is successfully added to the project"
        });
    } catch (err) {
        res.status(400).send({ err });
    }
}

async function removeMemberFromProject(req, res) {
    try {
        const memberId = req.body.id;
        const projectId = req.params.id;
        const isProjectAccessible = req.project.members.includes(memberId);
        if (!isProjectAccessible) {
            throw "Member doesnt exist in this project";
        }

        await Project.findByIdAndUpdate(projectId, {
            $pull: { members: memberId }
        });
        await User.findByIdAndUpdate(memberId, {
            $pull: { projects: projectId }
        });
        res.status(200).send({
            message: "Member is successfully removed from the project"
        });
    } catch (err) {
        res.status(400).send({ err });
    }
}

async function removeMyselfFromProject(req, res) {
    try {
        const memberId = req.user._id;
        const projectId = req.params.id;

        const isProjectAccessible = (req.user.projects || []).includes(
            projectId
        );
        if (!isProjectAccessible) {
            throw "Project not found";
        }

        const project = await Project.findById(projectId);
        if (!project) {
            throw "Project not found";
        }

        const isMeOwner = project.owner.toString() === memberId.toString();
        if (isMeOwner) {
            throw "Owner cant remove himself";
        }

        await Project.findByIdAndUpdate(projectId, {
            $pull: { members: memberId }
        });
        await User.findByIdAndUpdate(memberId, {
            $pull: { projects: projectId }
        });
        res.status(200).send({
            message: "You successfully removed from project"
        });
    } catch (err) {
        res.status(400).send({ err });
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
    removeMyselfFromProject
};
