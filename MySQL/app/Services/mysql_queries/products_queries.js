import db from "../mysql.js";
import moment from "moment/moment.js";

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
      idproducto: imageData.idproducto
    };
    return await db.query(
      "INSERT INTO imagenes SET ?",
      imageObj,
      "insert",
      conn
    );
  } catch (e) {
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
      "SELECT * FROM imagenes WHERE id = ?",
      id,
      "select",
      conn
    );
  } catch (e) {
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
      "DELETE * FROM imagenes WHERE id = ?",
      id,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

productQueries.insertProduct = async (productData) => {
 
};

productQueries.getProductByRef = async (reference) => {
     // Conectamos con la base de datos y buscamos si existe el usuario por el email.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM productos WHERE referencia = ?",
      reference,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
}

productQueries.addProduct = async (productData) => {
    let conn = null;
    try {
        conn = await db.createConnection();
        console.log(productData);
        let productObj = {
            nombre:productData.name,
            descripcion: productData.description,
            precio: productData.price,
            stock: productData.stock,
            referencia: productData.reference,
            fechaAlta: moment().format("YYYY-MM-DD HH:mm:ss"),
        }
        return await db.query(
            "INSERT INTO productos SET ?", productObj, 'insert', conn
        )
    } catch(e) {
        throw new Error(e);
    } finally {
        conn && (await conn.end());
    }
}

productQueries.getProduct = async () => {
  // Conectamos con la base de datos y buscamos si existe la imagen por su id.
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM productos",
      [],
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

export default productQueries;
