import { Project, Task } from '../models';
import authUserMiddleware from './authUserMiddleware';
import { ErrorHandler } from './errorMiddleware';

const authMemberMiddleware = [
    authUserMiddleware,
    async (req, res, next) => {
        let projectId = req.params.project_id;
        const taskId = req.params.task_id;

        try {
            if (!projectId && !taskId) {
                throw new ErrorHandler(404, 'Required param not found');
            }

            if (taskId) {
                const task = await Task.findById(taskId);
                if (!task) {
                    throw new ErrorHandler(404, 'Task not found');
                }
                projectId = task.project;
            }

            const project = await Project.findById(projectId);
            if (!project) {
                throw new ErrorHandler(404, 'Project not found');
            }

            const isProjectMember = project.members.includes(
                res.locals.user._id
            );
            if (!isProjectMember) {
                throw new ErrorHandler(403, 'Auth failed');
            }

            res.locals.project = project;
            next();
        } catch (err) {
            next(err);
        }
    },
];

export default authMemberMiddleware;
