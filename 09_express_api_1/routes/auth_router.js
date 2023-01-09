import express from "express";
import authController from "../controllers/auth_controller.js"

const authRouter = express.Router();

// auth routes
authRouter.get("/public", authController.authPublic)
authRouter.post("/autenticado", authController.authAutenticado)
authRouter.post("/autorizado", authController.authAutorizado)

export default authRouter;