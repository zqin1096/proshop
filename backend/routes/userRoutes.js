import express from "express";
import {authUser, getUser, registerUser} from "../controllers/userController.js";
import {authorize} from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post('/login', authUser);
// Protect this route using the authMiddleware.
userRouter.route('/profile').get(authorize, getUser);
userRouter.route('/').post(registerUser);

export default userRouter;