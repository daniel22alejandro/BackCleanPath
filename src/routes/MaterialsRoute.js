import { Router } from "express";
import { GetMaterials, PostMaterial, DeleteMaterials, UpdateMaterials } from "../controllers/MaterialsController.js";
import { validarToken } from "../controllers/AuthController.js";
import { materialValidate } from "../validations/MaterialsValidate.js";

const routeMaterials = Router()

routeMaterials.get('/listar', validarToken, GetMaterials),
routeMaterials.post('/registrar',materialValidate, validarToken,  PostMaterial),
routeMaterials.delete('/eliminar/:idmaterials',validarToken,  DeleteMaterials),
routeMaterials.put('/actualizar/:id',validarToken,materialValidate,   UpdateMaterials)

export default routeMaterials