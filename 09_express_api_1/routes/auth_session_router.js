import express from "express";
import authSessionController from "../controllers/auth_session_controller.js";

const authSessionRouter = express.Router();

// auth-session router
authSessionRouter.post("/login", authSessionController.authUser);
authSessionRouter.get("/profile", authSessionController.listUser);

export default authSessionRouter;