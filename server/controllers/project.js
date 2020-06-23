import { User, Project, Task } from '../models';
import { ErrorHandler } from '../middleware/errorMiddleware';

const taskPopulateQuery = [
    { path: 'assignee', select: 'username avatarUrl' },
    { path: 'tasks', select: 'isCompleted' },
];

const projectPopulateQuery = [
    { path: 'members', select: 'username avatarUrl fullName' },
    { path: 'owner', select: 'username' },
    {
        path: 'tasks',
        select: 'title description assignee isCompleted',
        populate: taskPopulateQuery,
    },
];

const projectsPopulateQuery = [
    { path: 'members', select: 'username avatarUrl' },
    {
        path: 'tasks',
        select: 'isCompleted',
    },
];

export async function createProject(req, res, next) {
    const { user } = res.locals;
    const project = new Project({
        ...req.body,
        owner: user._id,
        members: [user._id],
    });

    try {
        const validationError = await project.validate();
        if (validationError) {
            throw new ErrorHandler(400, validationError);
        }
        await project.save();
        await Project.populate(project, projectPopulateQuery);

        res.status(201).send({ project });
    } catch (err) {
        next(err);
    }
}

export async function getProjects(req, res, next) {
    const { user } = res.locals;
    try {
        const projects = await Project.find({ members: user._id }).populate(
            projectsPopulateQuery
        );
        res.status(200).send({ projects });
    } catch (err) {
        next(err);
    }
}

export async function getProject(req, res, next) {
    try {
        const project = await Project.populate(
            res.locals.project,
            projectPopulateQuery
        );
        res.status(200).send({ project });
    } catch (err) {
        next(err);
    }
}

export async function updateProject(req, res, next) {
    const updatableKeys = ['description', 'title', 'owner'];
    const fieldsToUpdate = Object.keys(req.body);

    try {
        const isUpdatable = fieldsToUpdate.every((key) =>
            updatableKeys.includes(key)
        );
        if (!isUpdatable) {
            throw new ErrorHandler(400, 'Invalid updates');
        }

        const { project } = res.locals;
        if (fieldsToUpdate.includes('owner')) {
            const memberId = req.body.owner;
            const isMember = project.members.includes(memberId);
            if (!isMember) {
                throw new ErrorHandler(400, 'User is not a member');
            }
        }

        const $project = await Project.findByIdAndUpdate(
            project._id,
            { $set: req.body },
            { runValidators: true, new: true }
        ).populate(projectPopulateQuery);

        res.status(200).send({ project: $project });
    } catch (err) {
        next(err);
    }
}

export async function removeProject(req, res, next) {
    try {
        await Project.deleteOne({ _id: req.params.project_id });
        res.status(200).send({ message: 'Project is successfully removed' });
    } catch (err) {
        next(err);
    }
}

export async function addMember(req, res, next) {
    const { project_id } = req.params;
    const { _id } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) {
            throw new ErrorHandler(404, 'User doesnt exist');
        }

        const isMember = res.locals.project.members.includes(_id);
        if (isMember) {
            throw new ErrorHandler(400, 'User is a member');
        }

        const project = await Project.findByIdAndUpdate(
            project_id,
            {
                $addToSet: { members: _id },
            },
            { new: true }
        ).populate(projectPopulateQuery);

        await User.updateOne(
            { _id },
            {
                $addToSet: { projects: project_id },
            }
        );

        return res.status(200).send({
            project,
        });
    } catch (err) {
        next(err);
    }
}

export async function removeMember(req, res, next) {
    const { project_id } = req.params;
    const { _id } = req.body;
    const { project, user } = res.locals;

    try {
        const isMemberExist = project.members.includes(_id);
        if (!isMemberExist) {
            throw new ErrorHandler(404, 'Member doesnt exist in this project');
        }

        const isOwner = user._id.toString() === project.owner.toString();
        const isRemoveMyself = user._id.toString() === _id.toString();
        //XOR operator - u can either remove other as owner or yourself as member
        if (isOwner ? isRemoveMyself : !isRemoveMyself) {
            throw new ErrorHandler(403, 'The action is not allowed');
        }

        const $project = await Project.findByIdAndUpdate(
            project_id,
            {
                $pull: { members: _id },
            },
            { new: true }
        ).populate(projectPopulateQuery);

        await User.updateOne(
            { _id },
            {
                $pull: { projects: project_id },
            }
        );

        res.status(200).send({
            project: $project,
        });
    } catch (err) {
        next(err);
    }
}

export async function addTask(req, res, next) {
    const { project_id: project } = req.params;

    try {
        if (req.body.parentTask) {
            const pTask = await Task.findById(req.body.parentTask);

            if (!pTask) {
                throw new ErrorHandler(404, 'Parent task not found');
            }

            if (pTask.project.toString() !== project) {
                throw new ErrorHandler(
                    409,
                    'Parent task is from different project'
                );
            }
        }

        const task = new Task({
            ...req.body,
            project,
        });

        const validationError = await task.validate();
        if (validationError) {
            throw new ErrorHandler(422, validationError);
        }

        await task.save();
        await Task.populate(task, taskPopulateQuery);

        res.status(201).send({ task });
    } catch (err) {
        next(err);
    }
}
