import express from "express";
import productController from "../controllers/products_controller.js"
const productRouter = express.Router();

productRouter.post("/upload", productController.uploadImage);
// Obtener imagen por su id
productRouter.get("/image/:id", productController.getImage);
productRouter.delete("/image/:id", productController.getImage)
productRouter.post("/add_product", productController.addProduct)

export default productRouter