import path from "path";
import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config({ path: path.resolve(__dirname, ".env") });

import userRouter from "./routes/users";
import projectRouter from "./routes/projects";
import taskRouter from "./routes/tasks";

app.use(express.json());

app.use()
    .use("/users", userRouter)
    .use("/projects", projectRouter)
    .use("/tasks", taskRouter);

export default app;
