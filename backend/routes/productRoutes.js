import express from "express";
import {
    addProduct,
    addReview,
    deleteProduct,
    getProduct,
    getProducts, isReviewed,
    updateProduct, updateReview
} from "../controllers/productController.js";
import {authorize, checkIsAdmin} from "../middlewares/authMiddleware.js";

const productRouter = express.Router();

productRouter.route('/').get(getProducts);
productRouter.route('/').post(authorize, checkIsAdmin, addProduct);

productRouter.route('/:id').get(getProduct);
productRouter.route('/:id').delete(authorize, checkIsAdmin, deleteProduct);
productRouter.route('/:id').put(authorize, checkIsAdmin, updateProduct);

productRouter.route('/:id/reviews').post(authorize, addReview);
productRouter.route('/:id/is-reviewed').get(authorize, isReviewed);
productRouter.route('/:id/reviews').put(authorize, updateReview);


export default productRouter;