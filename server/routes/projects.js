import express from "express";
import projectController from "../controllers/project";
import authUser from "../middleware/authUser";
import authProjectOwner from "../middleware/authProjectOwner";
import authProjectMember from "../middleware/authProjectMember";

const router = express.Router();

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

export default router;
