import express from "express";
import productController from "../controllers/products_controller.js"
const productRouter = express.Router();

productRouter.post("/upload", productController.uploadImage);

export default productRouter