import { Router } from 'express';

import userRoutes from './user';
import projectRoutes from './project';
import taskRoutes from './task';

import getUserMiddleware from '../middleware/getUserMiddleware';
import errorMiddleware from '../middleware/errorMiddleware';

import ROUTES from '../../shared/routes';

const router = new Router();

router.use(getUserMiddleware);

router.use(ROUTES.PROJECT.ROOT, projectRoutes);
router.use(ROUTES.USER.ROOT, userRoutes);
router.use(ROUTES.TASK.ROOT, taskRoutes);

router.use(errorMiddleware);

router.use('*', (req, res, next) => {
    if (res.locals.user) {
        res.render('private');
    } else {
        res.render('public');
    }
});

export default router;
