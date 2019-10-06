const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const authUser = require("../middleware/authUser")
const authProjectUser = require("../middleware/authProjectUser");

router.post("/tasks/:id/tasks", [authUser, authProjectUser], taskController.addTaskToTask);
router.get("/tasks/:id", [authUser, authProjectUser], taskController.getTaskById);
router.patch("/tasks/:id", [authUser, authProjectUser], taskController.updateTaskById);
router.delete("/tasks/:id", [authUser, authProjectUser], taskController.deleteTaskById);

module.exports = router;