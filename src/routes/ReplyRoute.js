import { Router } from "express";
import { GetReplies, PostReply, UpdateReply, DeleteReply } from "../controllers/ReplyController.js";

const routeReply = Router()
 routeReply.get('/listar', GetReplies),
 routeReply.post('/registrar', PostReply),
 routeReply.put('/actualizar/:id', UpdateReply),
 routeReply.delete('/eliminar/:id', DeleteReply)


export default routeReply