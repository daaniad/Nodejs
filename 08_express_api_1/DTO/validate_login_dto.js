import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from 'ajv-errors';

const LoginDtoSchema = Type.Object({
    email: Type.String({
        format: 'email',
        errorMessage: {
            type: 'El tipo de email debe ser un string',
            format: 'Email debe contener un correo electrónico válido'
        }
    }),
    password: Type.String({
        errorMessage: {
            type: 'El tipo de password debe ser un string'
        }
    })
}, {
    additionalProperties:false,
    errorMessage: {
        type: 'Debe ser un objeto',
        additionalProperties: 'El formato del objetono es válido',
        required: {
            email: 'El email es requerido',
            password: 'La password es requerida'
        }
    }

});

const ajv = new Ajv({allErrors: true})
// addFormats añade formato de validación
addFormats(ajv, ['email']);
// addErrors permite personalizar errores
addErrors(ajv, {keepErrors:false});

// Metemos el esquema en el ajv para generar una función de la validación
const validate = ajv.compile(LoginDtoSchema);

// Función para validar el dto (email, password)
const validateLoginDto = (req, res, next) => {

// le pasamos la función de validación
const isDTOValid = validate(req.body);

//Si no ha pasado la validación, enviamos un 400 y el tipo de error de validación
if (!isDTOValid) return res.status(400).send(ajv.errorsText(validate.errors, { separator: '\n' }));
next();

};
export default validateLoginDto;