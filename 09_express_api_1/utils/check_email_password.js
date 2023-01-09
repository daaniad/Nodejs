import { USERS_BBDD } from "../bbdd.js";
import userModel from "../Service/Schemas/user_schema.js";

// Función para validar email y password
const checkEmailPassword = async (email, password) => {
     //Buscamos usuario por email
     const user = await userModel.findOne({email: email}).exec()
     // Buscamos el email entre las cuentas para buscarlo
    // const user = USERS_BBDD.find(user => user.email === email);
     // Si no existe el usuario lanzamos un error
     if (!user) throw new Error();
     // Si la password no coincide con la recibida lanzamos un error
     if (user.password !== password) throw new Error();
     // Si todo es correcto devolvemos el usuario   
     return user;
};

export default checkEmailPassword;