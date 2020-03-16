import { Router } from 'express';
import {
    createProject,
    getProjects,
    getProject,
    updateProject,
    removeProject,
    addMember,
    removeMember,
    addTask,
} from '../controllers/project';
import authUserMiddleware from '../middleware/authUserMiddleware';
import authOwnerMiddleware from '../middleware/authOwnerMiddleware';
import authMemberMiddleware from '../middleware/authMemberMiddleware';

import ROUTES from '../../shared/routes';

const router = new Router();

router.post('/', authUserMiddleware, createProject);
router.get('/', authUserMiddleware, getProjects);
router.get('/:project_id', authMemberMiddleware, getProject);
router.patch('/:project_id', authOwnerMiddleware, updateProject);
router.delete('/:project_id', authOwnerMiddleware, removeProject);
router.post(
    `/:project_id${ROUTES.PROJECT.MEMBERS}`,
    authOwnerMiddleware,
    addMember
);
router.delete(
    `/:project_id${ROUTES.PROJECT.MEMBERS}`,
    authMemberMiddleware,
    removeMember
);
router.post(
    `/:project_id${ROUTES.PROJECT.TASKS}`,
    authMemberMiddleware,
    addTask
);

export default router;
