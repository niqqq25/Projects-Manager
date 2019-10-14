const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    secondname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    phone: {
        type: String,
        required: true
    },
    company: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ]
});

userSchema.pre("deleteOne", async function(next) {
    const Project = require("./project");
    const Task = require("./task");
    const userId = this.getQuery()._id;

    try {
        //remove user from projects
        await Project.updateMany(
            { members: userId },
            { $pull: { members: userId } }
        ).exec();

        //remove user from assigned tasks
        await Task.updateMany(
            { assignee: userId },
            { $unset: { assignee: "" } }
        ).exec();

        next();
    } catch (err) {
        next(new Error(err));
    }
});

module.exports = mongoose.model("User", userSchema);
