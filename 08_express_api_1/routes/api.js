import express from "express";
import accountController from "../controllers/account_controllers.js"
import authController from "../controllers/auth_controller.js"
import authSessionController from "../controllers//auth_session_controller.js";
import authTokenController from "../controllers/auth_token_controller.js"
import validateLoginDto from "../DTO/validate_login_dto.js";

const router = express.Router();

// Account routes
router.get("/account/:guid", accountController.listUser);
router.post("/account/", accountController.addUser);
router.patch("/account/:guid", accountController.updateUser);
router.delete("/account/:guid", accountController.deleteUser);

//Auth routes
router.get("/auth/public", authController.authPublic);
router.post("/auth/autenticado", authController.authAuthorization);
router.post("/auth/autorizado", authController.authAuthorized);


//Auth-session routes
router.post("/auth-session/login", authSessionController.authSessionLogin);
router.get("/auth-session/profile", authSessionController.authSessionProfile);


// auth-token routes
router.post("/auth-token/login", validateLoginDto, authTokenController.authTokenLogin);
router.get("/auth-token/profile", authTokenController.authTokenProfile);

export default router;