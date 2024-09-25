import { Router } from "express";
import { ValidateUsers } from "../controllers/AuthController.js";
import { validateUserLogin } from "../validations/AuthValidate.js";

const routeAuth = Router()
routeAuth.post('/validar',validateUserLogin, ValidateUsers)


export default routeAuth