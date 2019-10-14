const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const authUser = require("../middleware/authUser");
const authProjectMember = require("../middleware/authProjectMember");

router.post("/:task_id", [authUser, authProjectMember], taskController.addTaskToTask);
router.get("/:task_id", [authUser, authProjectMember], taskController.getTaskById);
router.patch("/:task_id", [authUser, authProjectMember], taskController.updateTaskById);
router.delete("/:task_id", [authUser, authProjectMember], taskController.deleteTaskById);
router.post("/:task_id/assignee", [authUser, authProjectMember], taskController.addAssignee);
router.delete("/:task_id/assignee", [authUser, authProjectMember], taskController.removeAssigne);

module.exports = router;
