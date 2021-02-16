import express from "express";
import {authorize} from "../middlewares/authMiddleware.js";
import {addOrder} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.route('/').post(authorize, addOrder);

export default orderRouter;