import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // Expires in 24 hours.
    });
}

export default generateToken;