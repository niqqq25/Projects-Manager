const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project");
const authUser = require("../middleware/authUser");
const authProjectOwner = require("../middleware/authProjectOwner");
const authProjectMember = require("../middleware/authProjectMember");

router.post("/", authUser, projectController.createProject);
router.get("/", authUser, projectController.getProjects);
router.get("/:project_id", [authUser, authProjectMember], projectController.getProjectById);
router.patch(
    "/:project_id",
    [authUser, authProjectOwner],
    projectController.updateProjectById
);
router.delete(
    "/:project_id",
    [authUser, authProjectOwner],
    projectController.removeProjectById
);
router.post(
    "/:project_id/members",
    [authUser, authProjectOwner],
    projectController.addMemberToProject
);
router.delete(
    "/:project_id/members",
    authUser,
    projectController.removeMemberFromProject
);
router.post(
    "/:project_id/tasks",
    [authUser, authProjectMember],
    projectController.addTaskToProject
);

module.exports = router;
