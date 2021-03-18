import express from "express";
import {deleteProduct, getProduct, getProducts} from "../controllers/productController.js";
import {authorize, checkIsAdmin} from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

productRouter.route('/').get(getProducts);

productRouter.route('/:id').get(getProduct);
productRouter.route('/:id').delete(authorize, checkIsAdmin, deleteProduct);


export default productRouter;