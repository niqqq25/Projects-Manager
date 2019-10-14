const mongoose = require("mongoose");
const getTaskChildren = require("../helpers/getTaskChildren");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    parentTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description: String,
    isCompleted: {
        type: Boolean,
        default: false
    }
});

taskSchema.post("save", async function(next) {
    try {
        if (this.parentTask) {
            await Task.updateOne(
                { _id: this.parentTask },
                {
                    $push: { tasks: this._id }
                }
            );
        } else {
            const Project = require("./project");
            await Project.updateOne(
                { _id: this.project },
                {
                    $push: { tasks: this._id }
                }
            );
        }
        next();
    } catch (err) {
        next(new Error(err));
    }
});

taskSchema.pre("deleteOne", async function(next) {
    const taskId = this.getQuery()._id;
    try {
        const task = await Task.findById(taskId);

        if (task.parentTask) {
            await Task.updateOne(
                { _id: task.parentTask },
                {
                    $pull: { tasks: taskId }
                }
            );
        } else {
            const Project = require("./project");
            await Project.updateOne(
                { _id: task.project },
                {
                    $pull: { tasks: taskId }
                }
            );
        }

        const taskChildren = await getTaskChildren(task.tasks);
        await Task.deleteMany({ _id: { $in: taskChildren } });
        next();
    } catch (err) {
        next(new Error(err));
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
