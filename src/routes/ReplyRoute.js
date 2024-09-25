import { Router } from "express";
import { GetReplies, PostReply, UpdateReply, DeleteReply } from "../controllers/ReplyController.js";
import { replyValidate } from "../validations/ReplyValidate.js"
import { validarToken } from "../controllers/AuthController.js";


const routeReply = Router()
 routeReply.get('/listar', validarToken, GetReplies),
 routeReply.post('/registrar', replyValidate, validarToken, PostReply),
 routeReply.put('/actualizar/:id',replyValidate, validarToken, UpdateReply),
 routeReply.delete('/eliminar/:id', validarToken, DeleteReply)


export default routeReply