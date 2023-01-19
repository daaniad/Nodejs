import dao from "../Services/dao.js";
import md5 from "md5";
import { currentDir } from "../index.js";

const __dirname = currentDir().__dirname;

const controller = {};

controller.uploadImage = async (req, res) => {
  try {
    if (req.files === null) return;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se ha cargado ningún archivo");
    }

    const images = !req.files.imagen.length
      ? [req.files.imagen]
      : req.files.imagen;
    images.forEach(async (image) => {
      let uploadPath = __dirname + "/public/images/products" + image.name;
      image.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
      });
      await dao.addImage({ name: image.name, path: uploadPath });
    });
    return res.send("Imagen subida!");
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getImage = async (req, res) => {
  try {
    // Buscamos si el id de la imagen existe en la base de datos
    const image = await dao.getImageById(req.params.id);
    // Si no existe devolvemos un 404 (not found)
    if (image.length <= 0) return res.status(404).send("La imagen no existe");
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send({ path: image[0].path });
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.addProduct = async (req, res) => {
  // controlar que viene el body
  const {name, description, price, stock, reference} = req.body;
  if (!name || !description || !price || !stock || !reference) {
    res.status(400).send("Error al recibir el body");
  }
  try {
    const product = await dao.getProductByRef(reference);
    // Si existe el producto, devolvemos 409 (conflict)
    if (product.length > 0) return res.status(409).send("Producto ya existe");
    // Si no existe, lo añadimos
    const insertProduct = await dao.insertProduct(req.body);
    if (insertProduct) return res.send(`Producto ${name} con id${insertProduct} añadido`)
  } catch (e) {
    console.log(e.message);

  }
  // Buscamos si existe producto por la referencia
  // añadimos producto producto detalle  -> creamos query para añadir producto (insert), creamos el dao
  // nos devuelve el id del producto
  // utilizamos la libreria express-upload para subir la imagen 
  // Añadimos el path a la tabla imagen y el id que hemos obtenido del producto 
  // devolvemos respuesta al cliente con el id del producto creado ok
}

export default controller;
