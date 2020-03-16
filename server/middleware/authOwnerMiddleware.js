import { Project } from '../models';
import authUserMiddleware from './authUserMiddleware';
import { ErrorHandler } from './errorMiddleware';

const authOwnerMiddleware = [
    authUserMiddleware,
    async (req, res, next) => {
        const projectId = req.params.project_id;

        try {
            if (!projectId) {
                throw new ErrorHandler(404, 'Required param not found');
            }

            const project = await Project.findOne({
                _id: projectId,
                owner: res.locals.user._id,
            });

            if (!project) {
                throw new ErrorHandler(403, 'User is not an owner');
            }

            res.locals.project = project;
            next();
        } catch (err) {
            next(err);
        }
    },
];

export default authOwnerMiddleware;
