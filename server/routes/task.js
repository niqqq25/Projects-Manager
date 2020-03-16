import { Router } from 'express';
import { getTask, updateTask, deleteTask } from '../controllers/task';
import authMemberMiddleware from '../middleware/authMemberMiddleware';

const router = new Router();

router.get('/:task_id', authMemberMiddleware, getTask);
router.patch('/:task_id', authMemberMiddleware, updateTask);
router.delete('/:task_id', authMemberMiddleware, deleteTask);

export default router;
