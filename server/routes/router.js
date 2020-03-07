import { Router } from "express";

import userRoutes from "./usersRoutes";
import projectRoutes from "./projectsRoutes";
import taskRoutes from "./tasksRoutes";
import errorMiddleware from "../middleware/errorMiddleware";

import ROUTES from "./routes";

const router = new Router();

router.use(ROUTES.PROJECT.ROOT, projectRoutes);
router.use(ROUTES.USER.ROOT, userRoutes);
router.use(ROUTES.TASK.ROOT, taskRoutes);

router.use(errorMiddleware);

router.use("*", (req, res, next) => res.render("public"));

export default router;
