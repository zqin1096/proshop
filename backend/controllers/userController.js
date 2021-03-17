import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import {ShippingAddress} from "../models/shippingAddressModel.js";

// DELETE /api/users/:id
// Private.
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(user);
    if (user) {
        await User.deleteOne({_id: user._id});
        res.sendStatus(200);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

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
// Public.
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

// Update user profile.
// PUT /api/users/profile
// Private.
export const updateUser = asyncHandler(async (req, res) => {
    req.user.name = req.body.name || req.user.name;
    req.user.email = req.body.email || req.user.email;
    if (req.body.password) {
        req.user.password = req.body.password;
    }
    try {
        await req.user.save();
        const user = await User.findById(req.user._id).select('-password');
        res.json({
            user
        });
    } catch (error) {
        res.status(400);
        console.log('enter');
        throw new Error('Email is already registered');
    }
});

// Add an address to the user.
// POST /api/users/profile/address
// Private.
export const addAddress = asyncHandler(async (req, res) => {
    const shippingAddress = await ShippingAddress.create({
        user: req.user._id,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        country: req.body.country,
        usedAt: Date.now()
    });
    req.user.shippingAddresses.push(shippingAddress._id);
    await req.user.save();
    res.json(shippingAddress);
});

// Delete an address of a user.
// DELETE /api/users/profile/address
// Private.
export const deleteAddress = asyncHandler(async (req, res) => {
    req.user.shippingAddresses.pull(req.body.id);
    await req.user.save();
    await ShippingAddress.deleteOne({_id: req.body.id});
    res.sendStatus(200);
});

// Get all the addresses of this user.
// GET /api/users/profile/address
// Private.
export const getAddresses = asyncHandler(async (req, res) => {
    const addresses = await User.findById(req.user._id).populate({
        path: 'shippingAddresses',
        options: {
            sort: {
                usedAt: -1
            }
        }
    }).select('shippingAddresses');
    res.json(addresses);
});

// Edit an address of a user.
// PUT /api/users/profile/address
// Private.
export const updateAddress = asyncHandler(async (req, res) => {
    const shippingAddress = await ShippingAddress.findById(req.body.id);
    shippingAddress.address = req.body.address;
    shippingAddress.city = req.body.city;
    shippingAddress.state = req.body.state;
    shippingAddress.postalCode = req.body.postalCode;
    shippingAddress.country = req.body.country;
    await shippingAddress.save();
    res.sendStatus(200);
});

// Get all the users.
// GET /api/users
// Private & Admin.
export const getUsers = asyncHandler(async (req, res) => {
    // Get all users.
    const users = await User.find({});
    res.json(users);
});