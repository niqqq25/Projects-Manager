const Task = require("../models/task");
const Project = require("../models/project");
const getTaskChildren = require("../helpers/getTaskChildren");

async function addTaskToTask(req, res) {
    const parentTask = req.params.id;
    const task = new Task({
        ...req.body,
        project: req.project._id,
        parentTask
    });
    try {
        await task.save();
        await Task.findByIdAndUpdate(parentTask, {
            $addToSet: { tasks: task._id }
        });
        res.status(200).send(task);
    } catch (err) {
        res.status(400).send({ err });
    }
}

async function getTaskById(req, res) {
    try {
        const task = await Task.findById(req.params.id).populate(
            "project parentTask tasks"
        );
        res.status(200).send(task);
    } catch (err) {
        res.status(400).send({ err });
    }
}

async function updateTaskById(req, res) {
    const updatableKeys = ["description", "isCompleted"];
    try {
        const isUpdatable = Object.keys(req.body).every(key =>
            updatableKeys.includes(key)
        );
        if (!isUpdatable) {
            throw "Invalid updates";
        }

        await Task.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ message: "Successfully updated" });
    } catch (err) {
        res.status(400).send({ err });
    }
}

async function deleteTaskById(req, res) {
    try {
        const task = await Task.findById(req.params.id);
        //remove ref from parent
        const parentId = task.parentTask;
        if (parentId) {
            await Task.findByIdAndUpdate(parentId, {
                $pull: { tasks: task._id }
            });
        } else {
            await Project.findByIdAndUpdate(task.project, {
                $pull: { tasks: task._id }
            });
        }
        //remove children and task
        const taskChildren = await getTaskChildren(task.tasks);
        taskChildren.push(task._id);
        await Task.deleteMany({_id: {$in: taskChildren}});
        res.status(200).send({ message: "Task successfully removed" });
    } catch (err) {
        res.status(400).send({ err });
    }
}

module.exports = { addTaskToTask, getTaskById, updateTaskById, deleteTaskById };
