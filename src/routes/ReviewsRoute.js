import { Router } from "express";
import { GetReviews, PostReview, DeleteReview } from "../controllers/ReviewsControler.js";
import { validarToken } from "../controllers/AuthController.js";
import { reviewValidate } from "../validations/ReviewsValidate.js"
import { subirImg } from "../controllers/ImagenController.js";


const routeReviews = Router()
 
routeReviews.get('/listar', validarToken,GetReviews),
routeReviews.post('/registrar',validarToken, subirImg, PostReview),
routeReviews.delete('/eliminar/:id',validarToken,  DeleteReview)


export default routeReviews
