import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// POST /api/users/login
// Public.
export const authUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (user && (await user.matchPassword(req.body.password))) {
        res.json({
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// GET /api/users/profile
// Private.
export const getUser = asyncHandler(async (req, res) => {
    if (req.user) {
        // The user property is added in the authMiddleware.
        res.json(req.user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Register a user.
// POST /api/users
// Public
export const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    const exist = await User.findOne({email: email});
    if (exist) {
        res.status(400);
        throw new Error('Email is already registered');
    }
    const user = await User.create({
        name: name,
        email: email,
        password: password
    });
    if (user) {
        res.status(201).json({
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Registration failed');
    }
});