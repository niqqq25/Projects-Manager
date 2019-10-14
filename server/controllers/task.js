const Task = require("../models/task");

async function addTaskToTask(req, res) {
    const task = new Task({
        ...req.body,
        project: req.project._id,
        parentTask: req.params.task_id
    });

    try {
        const validationError = await task.validate();
        if (validationError) {
            throw new Error(validationError);
        }

        await task.save();
        res.status(201).send({ message: "Task is successfully created" });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

async function getTaskById(req, res) {
    try {
        const task = await Task.findById(req.params.task_id).populate(
            "project parentTask tasks assignee"
        );
        res.status(200).send(task);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

async function updateTaskById(req, res) {
    const updatableKeys = ["description", "isCompleted"];
    
    try {
        const isUpdatable = Object.keys(req.body).every(key =>
            updatableKeys.includes(key)
        );
        if (!isUpdatable) {
            throw new Error("Invalid updates");
        }

        if (req.body.assignee) {
            const isMember = req.project.members.includes(req.body.assignee);
            if (!isMember) {
                throw new Error("Invalid updates");
            }
        }

        await Task.updateOne({ _id: req.params.task_id }, req.body);
        res.status(200).send({ message: "Successfully updated" });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

async function deleteTaskById(req, res) {
    try {
        await Task.deleteOne({ _id: req.params.task_id });
        res.status(200).send({ message: "Task successfully removed" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

async function addAssignee(req, res) {
    try {
        const userId = req.body.id;
        const isMember = req.project.members.includes(userId);
        if (!isMember) {
            throw new Error("Member is not found");
        }

        await Task.updateOne({ _id: req.params.task_id }, { assignee: userId });
        res.status(200).send({ message: "Successfully assigned " });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

async function removeAssigne(req, res) {
    try {
        await Task.updateOne(
            { _id: req.params.task_id },
            { $unset: { assignee: "" } }
        );
        res.status(200).send({ message: "Successfully unassigned" });
    } catch (err) {
        res.status(500).send({ message: err.message 
         });
    }
}

module.exports = {
    addTaskToTask,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    addAssignee,
    removeAssigne
};
