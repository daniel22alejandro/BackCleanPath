import { check } from "express-validator";

export const reviewValidate = [
    check('description', 'La descripción es obligatoria y debe ser una cadena de texto válida')
        .not().isEmpty().withMessage('La descripción no debe estar vacía')
        .isString().withMessage('La descripción debe ser una cadena de texto')
        .isLength({ max: 500 }).withMessage('La descripción no debe exceder 500 caracteres'),

    check('users_idusers', 'El ID del usuario es obligatorio y debe ser un número')
        .not().isEmpty().withMessage('El ID del usuario no debe estar vacío')
        .isInt().withMessage('El ID del usuario debe ser un número entero'),

    check('reply_idreply', 'El ID de la respuesta debe ser un número')
        .optional()
        .isInt().withMessage('El ID de la respuesta debe ser un número entero'),

    check('materials_idmaterials', 'El ID del material es obligatorio y debe ser un número')
        .not().isEmpty().withMessage('El ID del material no debe estar vacío')
        .isInt().withMessage('El ID del material debe ser un número entero')
];
