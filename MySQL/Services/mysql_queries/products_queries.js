import db from "../mysql.js";
import moment from "moment/moment.js";

const imageQueries = {}
const productQueries = {};

productQueries.addImage = async (imageData) => {
    // Conectamos con la base de datos y añadimos el usuario.
    let conn = null;
    try {
        conn = await db.createConnection();
        // Creamos un objeto con los dats de la imagen a guardar en la base de datos.
        // Usamos la libreria momentjs para registrar la fecha actual
        let imageObj = {
            nombre: imageData.name,
            path: imageData.path,
            fechaAlta: moment().format("YYYY-MM-DD HH:mm:ss"),
        };
        return await db.query("INSERT INTO imagenes SET ?", imageObj, "insert", conn);
    } catch(e) {
        throw new Error(e);
    } finally {
        conn && (await conn.end());
    }
};

productQueries.getImageById = async (id) => {
    // Conectamos con la base de datos y buscamos si existe la imagen por su id.
    let conn = null;
    try {
        conn = await db.createConnection();
        return await db.query(
            "SELECT * FROM imagenes WHERE id = ?", id, "select", conn
        );
    } catch(e) {
        throw new Error(e);
    } finally {
        conn && (await conn.end());
    }
};

productQueries.deleteImage = async (id) => {
    // Conectamos con la base de datos y buscamos si existe la imagen por su id.
    let conn = null;
    try {
        conn = await db.createConnection();
        return await db.query(
            "DELETE * FROM imagenes WHERE id = ?", id, "select", conn
        );
    } catch(e) {
        throw new Error(e);
    } finally {
        conn && (await conn.end());
    }
};

productQueries.insertProduct = async (productData) => {

}

export default productQueries;