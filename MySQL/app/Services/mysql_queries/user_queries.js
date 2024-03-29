import db from "../mysql.js"
import moment from "moment/moment.js"
import md5 from "md5";
import utils from "../../utils/utils.js";

const userQueries = {};

userQueries.getUserByEmail = async (email) => {
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
};

userQueries.getUserById = async (id) => {
    // Conectamos con la base de datos y buscamos si existe el usuario por el email.
    let conn = null
try{
    conn = await db.createConnection();
    console.log(id);
    return await db.query('SELECT * FROM usuarios WHERE id = ?', id, 'select', conn)
} catch (e) {
    throw new Error(e)
} finally {
    conn && await conn.end();
    }
    };

userQueries.addUser = async (userData) => {
    // Conectamos con la base de datos y añadimos el usuario.
    let conn = null
    try {
        conn = await db.createConnection()
        // Creamos un objeto con los datos del usuario a guardar en la base de datos.
        // Encriptamos la password con md5 y usamos la libreria momentjs para registrar la fecha actual
        console.log(userData);
        let userObj = {
           nombre: userData.name,
           apellidos: userData.surname,
           direccion: userData.direccion,
           email: userData.email,
           password: md5(userData.password),
           fechaAlta: moment().format("YYYY-MM-DD HH:mm:ss"),
           role: userData.role,
        }
        return await db.query('INSERT INTO usuarios SET ?', userObj, 'insert', conn)
    } catch (e) {
       throw new Error(e)
    } finally {
        conn && await conn.end();
    }
}

userQueries.deleteUser = async (id) => {
    let conn = null
    try {
        conn = await db.createConnection()
        return await db.query('DELETE FROM usuarios WHERE id=?', id, 'delete', conn)
    } catch (e) {
        throw new Error(e)
    }   finally {
        conn && await conn.end();
    }
}

// Modificar un usuario por su id
userQueries.updateUser = async (id, userData) => {
    // Conectamos con la base de datos y añadimos el usuario.
    let conn = null
    try {
        conn = await db.createConnection();
        // Creamos un objeto con los datos que nos puede llegar del usuario a modificar en la base de datos.
        // Encriptamos la password con md5 si nos llega por el body, sino la declaramos como undefined
        // y usamos la libreria momentjs para actualizar la fecha.
        let userObj = {
           nombre: userData.nombre,
           apellidos: userData.apellidos,
           direccion: userData.direccion,
           email: userData.email,
           password: userData.password ? md5(userData.password) : undefined,
           fechaMod: moment().format("YYYY-MM-DD HH:mm:ss"),
           role: userData.role
        }
        // Eliminamos los campos que no se van a modificar (no llegan por el body)
        userObj = await utils.removeUndefinedKeys(userObj)

        return await db.query('UPDATE usuarios SET ? WHERE id = ?', [userObj, id], 'insert', conn);
    } catch (e) {
       throw new Error(e);
    } finally {
        conn && await conn.end();
    }
};


export default userQueries