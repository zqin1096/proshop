import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const authorize = asyncHandler(async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token found');
    }
    if (token.startsWith('Bearer')) {
        try {
            const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, invalid token');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, invalid token');
    }
});

export const checkIsAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized');
    }
};