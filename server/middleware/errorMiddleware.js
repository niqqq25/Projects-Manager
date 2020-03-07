export class ErrorHandler extends Error {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}

export default function errorMiddleware(err, req, res, next){
    const { statusCode, message } = err;
    res.status(statusCode).json({ status: "error", statusCode, message });
};
