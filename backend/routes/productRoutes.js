import express from "express";
import {addProduct, deleteProduct, getProduct, getProducts, updateProduct} from "../controllers/productController.js";
import {authorize, checkIsAdmin} from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

productRouter.route('/').get(getProducts);
productRouter.route('/').post(authorize, checkIsAdmin, addProduct);

productRouter.route('/:id').get(getProduct);
productRouter.route('/:id').delete(authorize, checkIsAdmin, deleteProduct);
productRouter.route('/:id').put(authorize, checkIsAdmin, updateProduct);


export default productRouter;