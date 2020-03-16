import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
        },
    ],
});

projectSchema.post('save', async function(doc, next) {
    try {
        const User = require('./user').default;
        await User.updateOne(
            { _id: this.owner },
            {
                $push: { projects: this._id },
            }
        );
    } catch (err) {
        next(new Error(err));
    }
});

projectSchema.post('deleteOne', async function(doc, next) {
    try {
        const projectId = this.getQuery()._id;
        //remove tasks
        const Task = require('./task').default;
        await Task.deleteMany({ project: projectId });
        //remove project from users
        const User = require('./user').default;
        User.updateMany(
            { projects: projectId },
            { $pull: { projects: projectId } }
        ).exec();
    } catch (err) {
        next(new Error(err));
    }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
