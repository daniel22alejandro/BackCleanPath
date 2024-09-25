import express from 'express';
import { GetUsers, PostUsers, DeleteUsers, UpdateUsers } from "../controllers/UserController.js";
import { validarToken } from "../controllers/AuthController.js";
import { userValidate } from "../validations/UserValidate.js";

const routeUsers = express.Router();

routeUsers.get('/listar', validarToken, GetUsers);
routeUsers.post('/registrar', userValidate, PostUsers);
routeUsers.put('/actualizar/:id', userValidate, validarToken, UpdateUsers);
routeUsers.delete('/eliminar/:idusers', validarToken, DeleteUsers);

export default (servidor) => servidor.use("/users", routeUsers);


// inversion de control: el router decide que servidor usar 