import { check } from 'express-validator';

export const userValidate = [
    check('name_user', 'El nombre de usuario es obligatorio y debe ser una cadena de texto válida')
        .not().isEmpty().withMessage('El nombre no debe estar vacío')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .isLength({ max: 100 }).withMessage('El nombre no debe exceder 100 caracteres'),

    check('email', 'El email es obligatorio y debe ser un formato válido')
        .not().isEmpty().withMessage('El email no debe estar vacío')
        .isEmail().withMessage('El email debe ser un formato válido')
        .isLength({ max: 100 }).withMessage('El email no debe exceder 100 caracteres'),

    check('password', 'La contraseña es obligatoria y debe tener al menos 6 caracteres')
        .not().isEmpty().withMessage('La contraseña no debe estar vacía')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];
