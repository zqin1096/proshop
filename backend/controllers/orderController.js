import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// Create a new order.
// POST /api/orders
// Private.

export const addOrder = asyncHandler(async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, shippingPrice, taxPrice, totalPrice} = req.body;
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
            totalPrice: totalPrice
        });
        res.status(201).json(order);
    }
});