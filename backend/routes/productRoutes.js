import express from "express";
import {getProduct, getProducts} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.route('/').get(getProducts);

productRouter.route('/:id').get(getProduct);


export default productRouter;