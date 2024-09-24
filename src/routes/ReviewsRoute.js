import { Router } from "express";
import { GetReviews, PostReview, DeleteReview } from "../controllers/ReviewsControler.js";


const routeReviews = Router()
 
routeReviews.get('/listar', GetReviews),
routeReviews.post('/registrar', PostReview),
routeReviews.delete('/eliminar/:id', DeleteReview)


export default routeReviews
