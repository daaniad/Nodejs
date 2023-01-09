import express from "express";

import authTokenController  from "../controllers/auth_token_controller.js";
import validateLoginDto from "../dto/validate_login_dto.js";

const authTokenRouter = express.Router();


// auth-token router
authTokenRouter.post("/login",  validateLoginDto , authTokenController.authUser);
authTokenRouter.get("/profile", authTokenController.listAuthUser);

export default authTokenRouter;