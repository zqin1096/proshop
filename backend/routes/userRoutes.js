import express from "express";
import {
    addAddress,
    authUser,
    deleteAddress,
    getAddresses,
    getUser, getUsers,
    registerUser, updateAddress,
    updateUser
} from "../controllers/userController.js";
import {authorize, checkIsAdmin} from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post('/login', authUser);
// Protect this route using the authMiddleware.
userRouter.route('/profile').get(authorize, getUser);
userRouter.route('/profile').put(authorize, updateUser);
userRouter.route('/').post(registerUser);
userRouter.route('/profile/address').post(authorize, addAddress);
userRouter.route('/profile/address').delete(authorize, deleteAddress);
userRouter.route('/profile/address').get(authorize, getAddresses);
userRouter.route('/profile/address').put(authorize, updateAddress);
userRouter.route('/').get(authorize, checkIsAdmin, getUsers);

export default userRouter;