import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user_router.js";
import productRouter from "./routes/produtcs_router.js";
import cors from "cors"

// Añadimos el método config de dotenv para utilizar las variables de entorno
dotenv.config();

// instanciamos express
const app = express();

// --- middlewares de express ---
app.use(express.json());
app.use(express.text());
app.use(logger("dev"));
app.use(cookieParser());
app.use(cors())
app.use("/user", userRouter)

//await db.createConnection();

app.use("/product", productRouter)

export default app;