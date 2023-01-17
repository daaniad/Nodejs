import { SignJWT, jwtVerify } from "jose";
import dao from "../Services/dao.js";
import md5 from "md5"
const controller = {};

controller.addUser = async (req, res) => {
  const { name, email, password } = req.body;
  // Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
  if (!name || !email || !password)
    return res.status(400).send("Error al recibir el body");
  // Buscamos el usuario en la base de datos
  try {
    const user = await dao.getUserByEmail(email);
    // Si existe el usuario respondemos con un 409 (conflict)
    if (user.length > 0) return res.status(409).send("usuario ya registrado");
    // Si no existe lo registramos
    const addUser = await dao.addUser(req.body);
    if (addUser)
      return res.send(`Usuario ${name} con id: ${addUser} registrado`);
  } catch (e) {
    console.log(e.message);
  }
};

controller.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send("Error al recibir el body");
  try {
    let user = await dao.getUserByEmail(email);
    if (user.length <= 0) return res.status(404).send("Usuario no registrado");
    const custPassword = md5(password);
    [user] = user;
    if (user.password != custPassword)
      return res.status(401).send("Incorrect password");
    const jwtConstructor = new SignJWT({
      id: user.id,
      email,
      role: user.role,
    });

    const encoder = new TextEncoder();

    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_SECRET));
    return res.send({ jwt });
  } catch (e) {
    console.log(e.message);
  }
};


controller.deleteUser= async (req,res) => {
  const { authorization } = req.headers;
  // Si no existe el token enviamos un 401 (unauthorized)
  if (!authorization) return res.sendStatus(401);
  const token = authorization.split(" ")[1];

  try {
    // codificamos la clave secreta
    const encoder = new TextEncoder();
    // verificamos el token con la función jwtVerify. Le pasamos el token y la clave secreta codificada
    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_SECRET)
    );

    console.log(payload);
    if (!payload.role) return res.status(409).send("no tiene permiso de administrador");
    // Buscamos si el id del usuario existe en la base de datos
    const user = await dao.getUserById(req.params.id)
    console.log(user);
    // Si no existe devolvemos un 404 (not found)
    if (user.length <= 0) return res.status(404).send("el usuario no existe")
    // Si existe, eliminamos el usuario por el id
    await dao.deleteUser(req.params.id)
    // Devolvemos la respuesta
    return res.send(`Usuario con id ${req.params.id} eliminado`)
  } catch (e) {
    console.log(e.message);
  }


}

controller.updateUser= async (req, res) => {
  const {authorization} = req.headers;
  if (!authorization) {
    return res.sendStatus(401);
  }
  try {
    if (Object.entries(req.body).length === 0) return res.status(400).send("Body error");
    await dao.updateUser(req.params.id, req.body)
    return res.send(`User with id ${req.params.id} has been modified`)
  } catch (e) {
    console.log(e.message);
  }
}

export default controller;
