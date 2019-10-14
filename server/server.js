const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '.env')});
const express = require("express");
const app = express();

const userRouter = require("./routes/users");
const projectRouter = require("./routes/projects");
const taskRouter = require("./routes/tasks");

app.use(express.json())
    .use("/users", userRouter)
    .use("/projects", projectRouter)
    .use("/tasks", taskRouter);

module.exports = app;
