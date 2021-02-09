import Product from "../models/productModel.js";
import asyncHandler from 'express-async-handler';

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
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});