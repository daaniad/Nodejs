import express from "express";
import userController from "../controllers/user_controller.js"

const userRouter = express.Router();

userRouter.post("/", userController.addUser);
userRouter.post("/login", userController.loginUser);
userRouter.delete("/:id",userController.deleteUser);
userRouter.patch("/:id",userController.updateUser);




export default userRouter;
