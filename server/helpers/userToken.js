import jwt from 'jsonwebtoken';

const JWT_EXPIRATION_TIME = '10h';

export function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: JWT_EXPIRATION_TIME,
    });
}
