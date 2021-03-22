import Product from "../models/productModel.js";
import asyncHandler from 'express-async-handler';
import {Review} from "../models/reviewModel.js";

// Update a review.
// PUT /api/products/:id/
// Private.
export const updateReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body;
    // Find the product.
    const product = await Product.findById(req.params.id).populate('reviews');
    if (product) {
        const id = product.reviews.find((review) => review.user.toString() === req.user._id.toString())._id;
        const review = await Review.findById(id);
        review.rating = rating;
        review.comment = comment;
        await review.save();
        product.rating = (Math.round(product.reviews.reduce((accumulator, item) => Number(accumulator) + Number(item.rating), 0) / product.reviews.length * 100) / 100).toFixed(1);
        await product.save();
        res.sendStatus(200);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// Check if the user has reviewed the product.
// GET /api/products/:id/is-reviewed
// Private.
export const isReviewed = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('reviews');
    res.json({
        isReviewed: product.reviews.find((review) => review.user.toString() === req.user._id.toString()) != null
    });
});

// Add a new review.
// POST /api/products/:id/reviews
// Private.
export const addReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body;
    // Find the product.
    const product = await Product.findById(req.params.id);
    if (product) {
        // Create the review.
        const review = await Review.create({
            user: req.user._id,
            rating: Number(rating),
            comment: comment
        });
        // Add it to the reviews array.
        product.reviews.push(review._id);
        // Update the number of reviews.
        product.numReviews = product.reviews.length;
        await product.save();
        // Update the rating.
        const {reviews} = await Product.findById(req.params.id).populate('reviews');
        product.rating = (Math.round(reviews.reduce((accumulator, item) => Number(accumulator) + Number(item.rating), 0) / product.reviews.length * 100) / 100).toFixed(1);
        await product.save();
        res.sendStatus(201);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// Add a product.
// POST /api/products
// Private. Admin.
export const addProduct = asyncHandler(async (req, res) => {
    const product = await Product.create({
        user: req.user._id,
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        numReviews: 0,
        price: req.body.price,
        countInStock: req.body.countInStock
    });
    res.status(201).json(product);
});

// Update a product.
// PUT /api/products/:id
// Private. Admin.
export const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = req.body.name;
        product.image = req.body.image || product.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.description = req.body.description;
        product.price = req.body.price;
        product.countInStock = req.body.countInStock;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// Delete a product.
// DELETE /api/products/:id
// Private. Admin.
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await Product.deleteOne({_id: product._id});
        res.sendStatus(200);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// Get all products.
// GET /api/products
// Public
export const getProducts = asyncHandler(async (req, res) => {
    // Find all documents.
    const products = await Product.find({});
    res.json(products);
});

// The req object represents the HTTP request.
// req.params: An object containing properties mapped to the named route “parameters”. For example, if you have the
// route /user/:name, then the "name" property is available as req.params.name.

// Get a single product.
// GET /api/products/:id
// Public
// asyncHandler: Simple middleware for handling exceptions inside of async express routes and passing them to your
// express error handlers.
export const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'user',
            select: 'name'
        }
    });
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});