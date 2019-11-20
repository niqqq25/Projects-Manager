const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '.env')});
const express = require("express");
const cors = require("cors");
const app = express();

const userRouter = require("./routes/users");
const projectRouter = require("./routes/projects");
const taskRouter = require("./routes/tasks");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.use(cors());

app.use(express.json())
    .use("/users", userRouter)
    .use("/projects", projectRouter)
    .use("/tasks", taskRouter);

module.exports = app;
