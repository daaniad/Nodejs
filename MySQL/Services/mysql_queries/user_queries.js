import db from "../mysql.js"
import moment from "moment/moment.js"
import md5 from "md5";

const userQueries = {};

userQueries.getUser = async (email) => {
// Conectamos con la base de datos y buscamos si existe el usuario por el email.
let conn = null
try{
    conn = await db.createConnection()
    return await db.query('SELECT * FROM usuarios WHERE email = ?', email, 'select', conn)
} catch (e) {
    throw new Error(e)
} finally {
    conn && await conn.end();
    }
}

userQueries.addUser = async (userData) => {
    // Conectamos con la base de datos y añadimos el usuario.
    let conn = null
    try {
        conn = await db.createConnection()
        // Creamos un objeto con los datos del usuario a guardar en la base de datos.
        // Encriptamos la password con md5 y usamos la libreria momentjs para registrar la fecha actual
        let userObj = {
           nombre: userData.nombre,
           apellidos: userData.apellidos,
           direccion: userData.direccion,
           email: userData.email,
           password: md5(userData.password),
           fechaAlta: moment().format("YYYY-MM-DD HH:mm:ss")
        }
        return await db.query('INSERT INTO users SET ?', userObj, 'insert', conn)
    } catch (e) {
       throw new Error(e)
    } finally {
        conn && await conn.end();
    }
}

export default userQueries