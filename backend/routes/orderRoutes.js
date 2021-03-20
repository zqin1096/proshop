import express from "express";
import {authorize, checkIsAdmin} from "../middlewares/authMiddleware.js";
import {addOrder, getAllOrders, getOrder, getOrders, updateOrderToDelivered} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.route('/').post(authorize, addOrder);
orderRouter.route('/:id').get(authorize, getOrder);
orderRouter.route('/').get(authorize, getOrders);
orderRouter.route('/admin/all').get(authorize, checkIsAdmin, getAllOrders);
orderRouter.route('/:id/deliver').put(authorize, checkIsAdmin, updateOrderToDelivered);

export default orderRouter;