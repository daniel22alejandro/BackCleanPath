import { Router } from "express";
import { GetUsers, PostUsers, DeleteUsers, UpdateUsers } from "../controllers/UserController.js";

const routeUsers = Router()

routeUsers.get('/listar', GetUsers)
routeUsers.post('/registrar', PostUsers)
routeUsers.put('/actualizar/:id', UpdateUsers)
routeUsers.delete('/eliminar/:idusers', DeleteUsers)

export default routeUsers
