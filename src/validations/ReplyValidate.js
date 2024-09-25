import { check } from "express-validator";

export const replyValidate = [
    check('comment', 'El comentario es obligatorio y debe ser una cadena de texto válida')
        .not().isEmpty().withMessage('El comentario no debe estar vacío')
        .isString().withMessage('El comentario debe ser una cadena de texto')
        .isLength({ max: 100 }).withMessage('El comentario no debe exceder 100 caracteres'),

    check('users_idusers', 'El ID del usuario es obligatorio y debe ser un número')
        .not().isEmpty().withMessage('El ID del usuario no debe estar vacío')
        .isInt().withMessage('El ID del usuario debe ser un número entero')
];
