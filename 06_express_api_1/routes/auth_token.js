import express from "express";
import checkEmailPassword from "../utils/check_email_password.js";
import { USERS_BBDD } from "../bbdd.js";
import { SignJWT } from "jose";

const authTokenRouter = express.Router();

//Login con email y password
authTokenRouter.post('/login', async (req, res) => {
    const{email, password} = req.body;
    
    if (!email || !password) return res.sendStatus(400);

    try {
        const {guid} = checkEmailPassword(email, password);
        //Construimos el JWT con el guid
        const jwtConstructor = new SignJWT ({guid});
        // Codificamos el la clave secreta definida en la variable de entorno por requisito de la librería jose
        // y poder pasarla en el formato correcto (uint8Array) en el método .sign
        const encoder = new TextEncoder();
        // Generamos el JWT. Lo hacemos asíncrono, ya que nos devuelve una promesa. 
       // Le indicamos la cabecera, la creación, la expiración y la firma (clave secreta).
       const jwt = await jwtConstructor
       .setProtectedHeader({ alg: 'HS256', typ: "JWT"})
       .setIssuedAt()
       .setExpirationTime('1h')
       .sign(encoder.encode(process.env.JWT_SECRET));

       console.log(jwt);
        //Si todo es correcto enviamos la respuesta. 200 OK
        return res.send({ jwt })
    } catch (err) {
        return res.sendStatus(401);
    }
});

authTokenRouter.get('/profile', (req, res) => {
    //OBTENER CABECERA Y COMPROBAR SU AUTENTICIDAD Y CADUCIDAD
    const user = USERS_BBDD.find(user => user.guid === userSession.guid);
    if (!user) return res.send.sendStatus(401);
    delete user.password;
    return res.send(user)
})

export default authTokenRouter