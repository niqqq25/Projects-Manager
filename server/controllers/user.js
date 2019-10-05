const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_EXPIRATION_TIME = "10h"; //later change this to 1h

async function signUp(req, res) {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new User(Object.assign(req.body, { password: hash }));
        await user.save();
        res.status(200).send({ message: "Successfully signed up" });
    } catch (err) {
        res.status(400).send(err);
    }
}

async function signIn(req, res) {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (user) {
            const isPasswordMatching = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (isPasswordMatching) {
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
            }
        }
        throw new Error();
    } catch (err) {
        res.status(400).send({ message: "Auth failed" });
    }
}

async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw "User doesnt exist";
        }
        res.status(200).send(getPublicUserData(user));
    } catch (err) {
        res.status(400).send({ err });
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.find();
        const publicUsersData = users.map(user => getPublicUserData(user));
        res.status(200).send(publicUsersData);
    } catch (err) {
        res.status(400).send(err);
    }
}

function getPublicUserData(userData) {
    return {
        _id: userData._id,
        firstname: userData.firstname,
        email: userData.email,
        username: userData.username
    };
}

function getMe(req, res) {
    res.status(200).send(req.user);
}

async function deleteMe(req, res) {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.status(200).send({ message: "Successfully removed" });
    } catch (err) {
        res.status(400).send(err);
    }
}

async function updateMyPassword(req, res) {
    try {
        const password = req.body.password;
        if (password) {
            const hash = await bcrypt.hash(password, 10);
            await User.findByIdAndUpdate(req.user._id, { password: hash });
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
        } else {
            throw new Error();
        }
    } catch (err) {
        res.status(400).send({ message: "Failed to change password" });
    }
}

async function updateMe(req, res) {
    const updatableKeys = ["firstname", "email"];
    try {
        const isUpdatable = Object.keys(req.body).every(key =>
            updatableKeys.includes(key)
        );
        if (!isUpdatable) {
            throw "Invalid updates";
        }

        await User.findByIdAndUpdate(req.user._id, req.body);
        res.status(200).send({ message: "Successfully updated" });
    } catch (err) {
        res.status(400).send({ err });
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
