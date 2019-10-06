const mongoose = require("mongoose");
const Project = require("../models/project");

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
    description: String,
    isCompleted: Boolean
});

module.exports = mongoose.model("Task", taskSchema);
