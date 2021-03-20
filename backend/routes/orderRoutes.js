import express from "express";
import {authorize, checkIsAdmin} from "../middlewares/authMiddleware.js";
import {addOrder, getAllOrders, getOrder, getOrders} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.route('/').post(authorize, addOrder);
orderRouter.route('/:id').get(authorize, getOrder);
orderRouter.route('/').get(authorize, getOrders);
orderRouter.route('/admin/all').get(authorize, checkIsAdmin, getAllOrders);

export default orderRouter;