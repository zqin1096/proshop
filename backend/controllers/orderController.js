import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// Update the order to be delivered.
// PUT /api/orders/:id/deliver
// Private. Admin.
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('shippingAddress');
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// Get all the orders.
// GET /api/orders/admin/all
// Private. Admin.
export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});

// Create a new order.
// POST /api/orders
// Private.
export const addOrder = asyncHandler(async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, shippingPrice, taxPrice, totalPrice} = req.body.order;
    if (!orderItems || orderItems.length === 0) {
        res.status(400);
        throw new Error('No order item');
    } else {
        const order = await Order.create({
            user: req.user._id,
            orderItems: orderItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            taxPrice: taxPrice,
            shippingPrice: shippingPrice,
            totalPrice: totalPrice,
            isPaid: true,
            paidAt: Date.now(),
            paymentResult: {
                id: req.body.paymentResult.id,
                status: req.body.paymentResult.status,
                update_time: req.body.paymentResult.update_time,
                email_address: req.body.paymentResult.payer.email_address
            }
        });
        res.status(201).json(order);
    }
});

// Get an order.
// GET /api/orders/:id
// Private.
export const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('shippingAddress'); // Only returns the name and email of the user.
    if (order) {
        // Prevent other users to see this page. Admin user can see this page.
        if (req.user.isAdmin || String(order.user._id) === String(req.user._id)) {
            res.json(order);
        } else {
            res.status(401);
            throw new Error('Not authorized to see this page');
        }
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// Get orders of the user.
// GET /api/orders
// Private.
export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({
        user: req.user._id
    });
    res.json(orders);
});