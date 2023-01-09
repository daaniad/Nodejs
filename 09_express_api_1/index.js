import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cookieParser from "cookie-parser";


// importamos los routers
import accountRouter from "./routes/account_router.js"
import authRouter from "./routes/auth_router.js"
import authSessionRouter from "./routes/auth_session_router.js";
import authTokenRouter from "./routes/auth_token_router.js"
import mongodbConnection from "./Service/mongodb.js";

// Añadimos el método config de dotenv
dotenv.config();

// Definimos el puerto y utilizamos las variables de entorno
const PORT = process.env.PORT; 
const expressApp = express();

// --- middlewares de express ---
expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use(logger('dev'));
expressApp.use(cookieParser());

// --- api middlewares ---
expressApp.use("/account", accountRouter)
expressApp.use("/auth", authRouter)
expressApp.use("/aauth-session", authSessionRouter)
expressApp.use("/auth-token", authTokenRouter)

//Conectamos con la base de datos
await mongodbConnection()
    .then(() => {console.log('Database connection is OK!')})
    .catch(err => console.log('Error in database connection: ', err.message))

// Levantamos el servidor
expressApp.listen(PORT, () =>
    console.log(`Server in port ${PORT}`)
);