const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Project = require("../models/project");

const JWT_EXPIRATION_TIME = "10h"; //later change this to 1h
const PASSWORD_MIN_LENGTH = 6;

async function signUp(req, res) {
    try {
        if ((req.body.password || "").length < PASSWORD_MIN_LENGTH) {
            throw new Error("Password is too short");
        }

        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new User(Object.assign(req.body, { password: hash }));
        const validationError = await user.validate();
        if (validationError) {
            throw new Error(validationError);
        }

        await user.save();
        res.status(201).send({ message: "Successfully signed up" });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

async function signIn(req, res) {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            throw new Error("User not found");
        }

        const isPasswordMatching = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordMatching) {
            throw new Error("Wrong password");
        }

        const token = jwt.sign(
            {
                username: user.username,
                password: user.password
            },
            process.env.JWT_KEY,
            { expiresIn: JWT_EXPIRATION_TIME }
        );
        return res.status(200).send({
            message: "Successfully signed in",
            token
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.user_id).select(
            "-password"
        );
        if (!user) {
            throw new Error("User doesnt exist");
        }

        res.status(200).send(user);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

async function getUsers(req, res) {
    const queryParams = req.query;
    const query = {};

    try {
        if (queryParams.regex) {
            const regex = new RegExp("^" + queryParams.regex, "i");
            query.username = regex;
        }

        if (queryParams.project) {
            const isProjectMember = req.user.projects.includes(
                queryParams.project
            );
            if (!isProjectMember) {
                throw new Error("Project not found");
            }

            const isMembers = queryParams.isMembers === "false" ? false : true;
            query.projects = isMembers
                ? queryParams.project
                : {
                      $ne: queryParams.project
                  };
        }

        const users = await User.find(query).select("-password");
        res.status(200).send(users);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

async function getMe(req, res) {
    try {
        await User.populate(req.user, { path: "projects" });
        res.status(200).send(req.user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

async function deleteMe(req, res) {
    try {
        const projects = await Project.find({ owner: req.user._id });
        if (projects.length > 0) {
            throw new Error("You own a project");
        }

        await User.deleteOne({ _id: req.user._id });
        res.status(200).send({ message: "Successfully removed" });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

async function updateMyPassword(req, res) {
    const password = req.body.password;

    try {
        if (!password) {
            throw new Error("New password is required");
        }

        if (password.length < PASSWORD_MIN_LENGTH) {
            throw new Error("New password is too short");
        }

        const hash = await bcrypt.hash(password, 10);
        await User.updateOne({ _id: req.user._id }, { password: hash });
        const token = jwt.sign(
            {
                username: req.user.username,
                password: hash
            },
            process.env.JWT_KEY,
            { expiresIn: JWT_EXPIRATION_TIME }
        );

        res.status(200).send({
            message: "Password is successfully updated",
            token
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

async function updateMe(req, res) {
    const updatableKeys = ["firstname", "email", "secondname", "phone"];
    
    try {
        const isUpdatable = Object.keys(req.body).every(key =>
            updatableKeys.includes(key)
        );
        if (!isUpdatable) {
            throw new Error("Invalid updates");
        }

        await User.updateOne({ _id: req.user._id }, req.body);
        res.status(200).send({ message: "Successfully updated" });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
}

module.exports = {
    signUp,
    signIn,
    getUserById,
    getUsers,
    getMe,
    deleteMe,
    updateMe,
    updateMyPassword
};
