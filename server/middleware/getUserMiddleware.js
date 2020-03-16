import { User } from '../models';
import jwt from 'jsonwebtoken';

async function getUserMiddleware(req, res, next) {
    const userToken = req.cookies['user_token'];

    if (userToken) {
        try {
            const { username } = jwt.verify(userToken, process.env.JWT_KEY);
            const user = await User.findOne({ username });
            res.locals.user = user || null;
        } catch (err) {
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }
    next();
}

export default getUserMiddleware;
