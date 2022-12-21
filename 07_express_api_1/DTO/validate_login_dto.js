import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from 'ajv-errors';

const LoginDtoSchema = Type.Object({
    email: Type.String({
        format: 'email',
        errorMessage: {
            type: 'El tipo de eail debe ser un string',
            format: 'Email debe contener un correo electrónico válido'
        }
    }),
    password: Type.String({
        errorMessage: {
            type: 'El tipo de password debe ser un string'
        }
    })
}, {
    additionalProperties:false

});

const ajv = new Ajv({allErrors: true})
addFormats(ajv).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validate = ajv.compile(LoginDtoSchema);

const validateLoginDto = (req, res, next) => {

const isDTOValid = validate(req.body);

if (!isDTOValid) return res.status(400).send("El body no es válido");
next();

};
export default validateLoginDto;