const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project");
const authUser = require("../middleware/authUser");
const authProjectOwner = require("../middleware/authProjectOwner");

router.post("/projects", authUser, projectController.createProject);
router.get("/projects", authUser, projectController.getProjects);
router.get("/projects/:id", authUser, projectController.getProjectById);
router.patch(
    "/projects/:id",
    [authUser, authProjectOwner],
    projectController.updateProjectById
);
router.delete(
    "/projects/:id",
    [authUser, authProjectOwner],
    projectController.removeProjectById
);
router.post(
    "/projects/:id/members",
    [authUser, authProjectOwner],
    projectController.addMemberToProject
);
router.delete(
    "/projects/:id/members",
    [authUser, authProjectOwner],
    projectController.removeMemberFromProject
);
router.delete(
    "/projects/:id/members/me",
    authUser,
    projectController.removeMyselfFromProject
);
router.post("/projects/:id/tasks", authUser, projectController.addTaskToProject);

module.exports = router;
