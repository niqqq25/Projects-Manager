const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ]
});

projectSchema.post("save", async function(next) {
    try {
        const User = require("./user");
        await User.updateOne(
            { _id: this.owner },
            {
                $push: { projects: this._id }
            }
        );
        next();
    } catch (err) {
        next(new Error(err));
    }
});

projectSchema.post("deleteOne", async function(next) {
    try {
        const projectId = this.getQuery()._id;
        //remove tasks
        const Task = require("./task");
        await Task.deleteMany({ project: projectId });
        //remove project from users
        const User = require("./user");
        User.updateMany(
            { projects: projectId },
            { $pull: { projects: projectId } }
        ).exec();
    } catch (err) {
        next(new Error(err));
    }
});

module.exports = mongoose.model("Project", projectSchema);
