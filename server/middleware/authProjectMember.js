const Project = require("../models/project");
const Task = require("../models/task");

async function authProjectMember(req, res, next) {
    try {
        let projectId = req.params.project_id;
        const taskId = req.params.task_id;

        if (!projectId && !taskId) {
            throw "Required param not found";
        }

        if (taskId) {
            const task = await Task.findById(taskId);
            if (!task) {
                throw "Auth failed";
            }
            projectId = task.project;
        }

        const project = await Project.findById(projectId);
        if (!project) {
            throw "Auth failed";
        }

        const isProjectMember = project.members.includes(req.user._id);
        if (!isProjectMember) {
            throw "Auth failed";
        }

        req.project = project;
        return next();
    } catch (err) {
        res.status(400).send({ err });
    }
}

module.exports = authProjectMember;
