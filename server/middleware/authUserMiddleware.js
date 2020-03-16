import { ErrorHandler } from './errorMiddleware';

function authUserMiddleware(req, res, next) {
    if (res.locals.user) {
        next();
    } else {
        next(new ErrorHandler(401, 'Unauthorized'));
    }
}

export default authUserMiddleware;
