import express from "express";
import userController from "../controllers/user_controller.js"

const userRouter = express.Router();

userRouter.post("/", userController.addUser);
userRouter.post("/login", userController.loginUser)

export default userRouter;
