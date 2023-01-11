import dao from "../Services/dao.js"
const controller = {};

controller.addUser = (req, res) => {

}

controller.addUser = async (req, res) => {
    const { name, email, password } = req.body;
    // Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
    if (!name || !email || !password) return res.status(400).send("Error al recibir el body");
    // Buscamos el usuario en la base de datos
    try {
        const user = await dao.getUser(email)
        // Si existe el usuario respondemos con un 409 (conflict)
        if (user.length > 0) return res.status(409).send("usuario ya registrado");
        // Si no existe lo registramos
        const addUser = await dao.addUser(req.body)
        if (addUser) return res.send(`Usuario ${name} con id: ${addUser} registrado`)
    } catch (e) {
        console.log(e.message)
    }
}


export default controller;