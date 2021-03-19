import Product from "../models/productModel.js";
import asyncHandler from 'express-async-handler';

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
        product.image = req.body.image;
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
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});