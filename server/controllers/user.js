import bcrypt from 'bcryptjs';
import User from '../models/user';
import { Project } from '../models';
import { generateToken } from '../helpers/userToken';
import { ErrorHandler } from '../middleware/errorMiddleware';

const selectQuery = { password: 0 };

export async function createUser(req, res, next) {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new User(Object.assign(req.body, { password: hash }));

        const validationError = await user.validate();
        if (validationError) {
            throw new ErrorHandler(400, validationError);
        }

        await user.save();
        res.status(201).send({ message: 'User has been successfully created' });
    } catch (err) {
        next(err);
    }
}

export async function login(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new ErrorHandler(404, 'User not found');
        }

        const isPasswordMatching = await bcrypt.compare(
            password,
            user.password
        );
        if (!isPasswordMatching) {
            throw new ErrorHandler(400, 'Wrong password');
        }

        const token = generateToken({
            username: user.username,
            password: user.password,
        });

        res.cookie('user_token', token);

        res.status(200).send({
            message: 'Success',
        });
    } catch (err) {
        next(err);
    }
}

export async function getUserById(req, res, next) {
    try {
        const user = await User.findById(req.params.id, selectQuery);
        if (!user) {
            throw new ErrorHandler(404, 'User not found');
        }

        res.status(200).send({ user });
    } catch (err) {
        next(err);
    }
}

export async function getUsers(req, res, next) {
    const queryParams = req.query;
    const query = {};
    const { user } = res.locals;

    try {
        if (queryParams.regex) {
            const regex = new RegExp('^' + queryParams.regex, 'i');
            query.username = regex;
        }

        if (queryParams.project) {
            const isProjectMember = user.projects.includes(queryParams.project);
            if (!isProjectMember) {
                throw new ErrorHandler(404, 'Project not found');
            }

            const isMembers = queryParams.isMembers === 'false' ? false : true;
            query.projects = isMembers
                ? queryParams.project
                : {
                      $ne: queryParams.project,
                  };
        }

        const users = await User.find(query, selectQuery);
        res.status(200).send({ users });
    } catch (err) {
        next(err);
    }
}

export async function getMe(req, res, next) {
    const { _id } = res.locals.user;
    try {
        const user = await User.findById(_id, selectQuery);
        res.status(200).send({ user });
    } catch (err) {
        next(err);
    }
}

export async function deleteMe(req, res, next) {
    const { _id } = res.locals.user;

    try {
        const projects = await Project.find({ owner: _id });
        if (projects.length > 0) {
            throw new ErrorHandler(403, 'You own a project');
        }

        await User.deleteOne({ _id });
        res.status(200).send({ message: 'Successfully removed' });
    } catch (err) {
        next(err);
    }
}

export async function updateMe(req, res, next) {
    const { _id } = res.locals.user;
    const updatableKeys = ['fullName', 'password'];
    const isUpdatable = Object.keys(req.body).every(key =>
        updatableKeys.includes(key)
    );

    try {
        if (!isUpdatable) {
            throw new ErrorHandler(400, 'Invalid updates');
        }

        if (req.body.password) {
            if (req.body.password.length < 6) {
                throw new ErrorHandler(400, 'Password is too short');
            }

            const hash = await bcrypt.hash(req.body.password, 10);
            req.body.password = hash;
        }

        const user = await User.findByIdAndUpdate(
            _id,
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (req.body.password) {
            const token = generateToken({
                username: user.username,
                password: user.password,
            });
            res.cookie('user_token', token);
        }

        res.status(200).send({ user });
    } catch (err) {
        next(err);
    }
}
