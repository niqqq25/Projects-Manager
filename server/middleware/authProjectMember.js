const Project = require("../models/project");
const Task = require("../models/task");

async function authProjectMember(req, res, next) {
    let projectId = req.params.project_id;
    const taskId = req.params.task_id;

    try {
        if (!projectId && !taskId) {
            throw new Error("Required param not found");
        }

        if (taskId) {
            const task = await Task.findById(taskId);
            if (!task) {
                throw new Error("Auth failed");
            }
            projectId = task.project;
        }

        const project = await Project.findById(projectId);
        if (!project) {
            throw new Error("Auth failed");
        }

        const isProjectMember = project.members.includes(req.user._id);
        if (!isProjectMember) {
            throw new Error("Auth failed");
        }

        req.project = project;
        return next();
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

module.exports = authProjectMember;
