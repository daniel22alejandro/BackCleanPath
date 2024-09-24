import { Router } from "express";
import { GetMaterials, PostMaterial, DeleteMaterials, UpdateMaterials } from "../controllers/MaterialsController.js";

const routeMaterials = Router()

routeMaterials.get('/listar', GetMaterials),
routeMaterials.post('/registrar', PostMaterial),
routeMaterials.delete('/eliminar/:idmaterials', DeleteMaterials),
routeMaterials.put('/actualizar/:id', UpdateMaterials)

export default routeMaterials