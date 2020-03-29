import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        },
    ],
});

userSchema.pre('deleteOne', async function(next) {
    const userId = this.getQuery()._id;
    const Project = require('./project').default;
    const Task = require('./task').default;

    try {
        //remove user from projects
        await Project.updateMany(
            { members: userId },
            { $pull: { members: userId } }
        ).exec();

        //remove user from assigned tasks
        await Task.updateMany(
            { assignee: userId },
            { $unset: { assignee: '' } }
        ).exec();

        next();
    } catch (err) {
        next(new Error(err));
    }
});

const User = mongoose.model('User', userSchema);

export default User;
