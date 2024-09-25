import { check } from "express-validator";


export const materialValidate = [
    check('name_material', 'El nombre del material es obligatorio y debe ser una cadena de texto válida')
        .not().isEmpty().withMessage('El nombre del material no debe estar vacío')
        .isString().withMessage('El nombre del material debe ser una cadena de texto')
        .isLength({ max: 100 }).withMessage('El nombre del material no debe exceder 100 caracteres')
];
