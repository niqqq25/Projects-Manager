const Project = require("../models/project");
const Task = require("../models/task");

async function authProjectUser(req, res, next) {
    try {
        const taskId = req.params.id;
        const userId = req.user._id;
        const task = await Task.findById(taskId).populate('project');

        if(!task){
            throw "Task not found";
        }

        const project = task.project;
        const isProjectOwner = project.owner.toString() === userId.toString();
        const isProjectMember = project.members.includes(userId);

        if(!isProjectMember && !isProjectOwner){
            throw "Auth failed";
        }
        req.project = project; //maybe remove this??
        return next();
    } catch (err) {
        res.status(400).send({ err });
    }
}

module.exports = authProjectUser;
