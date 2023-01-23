import express from "express";
import userController from "../controllers/user_controller.js";
import validateLoginDto from "../utils/validate_login_to.js";

const userRouter = express.Router();

userRouter.post("/", userController.addUser);
userRouter.post("/login", validateLoginDto, userController.loginUser);
userRouter.delete("/:id", userController.deleteUser);
userRouter.patch("/:id", userController.updateUser);

export default userRouter;
