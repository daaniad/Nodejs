import productQueries from "./mysql_queries/products_queries.js";
import userQueries from "./mysql_queries/user_queries.js";

const dao = {};

// Buscar un usuario por el email
dao.getUserByEmail = async (email) => await userQueries.getUserByEmail(email);
// Añadir un nuevo usuario
dao.addUser = async (userData) => await userQueries.addUser(userData);

dao.getUserById = async (id) => await userQueries.getUserById(id);

dao.deleteUser = async (id) => {
  await userQueries.deleteUser(id);
};

dao.updateUser = async (id, userData) => await userQueries.updateUser(id, userData);

dao.addImage = async (imageData) => await productQueries.addImage(imageData);

//Obtener imagen por su id
dao.getImageById = async (id) => await productQueries.getImageById(id);

// Obtener producto por su referencia
dao.getProductByRef = async (reference) => await productQueries.getProductByRef(reference);

// Añadir producto
dao.insertProduct = async (productData) => await productQueries.addProduct(productData);

dao.getProduct = async () => await productQueries.getProduct();

export default dao;
