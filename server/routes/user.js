import { Router } from 'express';
import {
    createUser,
    login,
    logout,
    getMe,
    deleteMe,
    updateMe,
    getUserById,
    getUsers,
} from '../controllers/user';
import authUserMiddleware from '../middleware/authUserMiddleware';

import ROUTES from '../../shared/routes';

const router = new Router();

router.post('/', createUser);
router.post(ROUTES.USER.LOGIN, login);
router.get(ROUTES.USER.LOGOUT, logout);
router.get(ROUTES.USER.ME, authUserMiddleware, getMe);
router.delete(ROUTES.USER.ME, authUserMiddleware, deleteMe);
router.patch(ROUTES.USER.ME, authUserMiddleware, updateMe);
router.get('/:id', authUserMiddleware, getUserById);
router.get('/', authUserMiddleware, getUsers);

export default router;
