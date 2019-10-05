const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ username: decoded.username });
        if (user) {
            const isPasswordMatching = decoded.password === user.password;
            if (isPasswordMatching) {
                req.user = user;
                return next();
            }
        }
        throw new Error();

    } catch (error) {
        res.status(400).json({
            message: "Auth failed"
        });
    }
};

module.exports = authUser;
