const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authUser = async (req, res, next) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ username: decoded.username });
        if (!user) {
            throw new Error("Auth failed");
        }

        const isPasswordMatching = decoded.password === user.password;
        if (!isPasswordMatching) {
            throw new Error("Auth failed");
        }

        req.user = user;
        return next();
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

module.exports = authUser;
