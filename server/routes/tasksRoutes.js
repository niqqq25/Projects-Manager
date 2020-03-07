import { Router } from "express";
import taskController from "../controllers/task";
import authUser from "../middleware/authUser";
import authProjectMember from "../middleware/authProjectMember";

const router = new Router();

router.post(
    "/:task_id",
    [authUser, authProjectMember],
    taskController.addTaskToTask
);
router.get(
    "/:task_id",
    [authUser, authProjectMember],
    taskController.getTaskById
);
router.patch(
    "/:task_id",
    [authUser, authProjectMember],
    taskController.updateTaskById
);
router.delete(
    "/:task_id",
    [authUser, authProjectMember],
    taskController.deleteTaskById
);
router.post(
    "/:task_id/assignee",
    [authUser, authProjectMember],
    taskController.addAssignee
);
router.delete(
    "/:task_id/assignee",
    [authUser, authProjectMember],
    taskController.removeAssigne
);

export default router;
