import { check } from 'express-validator';

export const validateUserLogin = [
    check('email', 'El email es obligatorio y debe ser un formato válido')
        .not().isEmpty().withMessage('El email no debe estar vacío')
        .isEmail().withMessage('El email debe ser un formato válido')
        .isLength({ max: 100 }).withMessage('El email no debe exceder 100 caracteres'),

    check('password', 'La contraseña es obligatoria y debe tener al menos 6 caracteres')
        .not().isEmpty().withMessage('La contraseña no debe estar vacía')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];
