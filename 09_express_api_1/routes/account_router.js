import express from "express";
import accountController from "../controllers/account_controller.js";

const accountRouter = express.Router();

// Account routes
accountRouter.get("/:guid", accountController.listUser);
accountRouter.post("/", accountController.addUser);
accountRouter.patch("/:guid", accountController.updateUser);
accountRouter.delete("/:guid", accountController.deleteUser);

export default accountRouter;