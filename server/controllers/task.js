import { Task } from '../models';
import { ErrorHandler } from '../middleware/errorMiddleware';

const populateQuery = [
    {
        path: 'assignee',
        select: 'username avatarUrl',
    },
    {
        path: 'tasks',
        select: 'title description assignee isCompleted',
        populate: {
            path: 'assignee',
            select: 'username avatarUrl',
        },
    },
    {
        path: 'parentTask',
        select: 'title',
    },
    {
        path: 'project',
        select: 'title',
    },
];

export async function getTask(req, res, next) {
    try {
        const task = await Task.findById(req.params.task_id).populate(
            populateQuery
        );
        res.status(200).send({ task });
    } catch (err) {
        next(err);
    }
}

export async function updateTask(req, res, next) {
    const updatableKeys = ['description', 'isCompleted', 'title', 'assignee'];

    try {
        const isUpdatable = Object.keys(req.body).every((key) =>
            updatableKeys.includes(key)
        );
        if (!isUpdatable) {
            throw new ErrorHandler(400, 'Invalid updates');
        }

        if (req.body.assignee) {
            const isMember = res.locals.project.members.includes(
                req.body.assignee
            );
            if (!isMember) {
                throw new ErrorHandler(400, 'Assignee must be member');
            }
        }

        const task = await Task.findByIdAndUpdate(
            req.params.task_id,
            { $set: req.body },
            { runValidators: true, new: true }
        ).populate(populateQuery);

        res.status(200).send({ task });
    } catch (err) {
        next(err);
    }
}

export async function deleteTask(req, res, next) {
    try {
        await Task.deleteOne({ _id: req.params.task_id });
        res.status(200).send({ message: 'Task was successfully removed' });
    } catch (err) {
        next(err);
    }
}
