import express from "express";
import {authorize} from "../middlewares/authMiddleware.js";
import {addOrder, getOrder, getOrders} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.route('/').post(authorize, addOrder);
orderRouter.route('/:id').get(authorize, getOrder);
orderRouter.route('/').get(authorize, getOrders);

export default orderRouter;