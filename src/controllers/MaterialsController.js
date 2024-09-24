import { conexion } from "../database/conexion.js";

export const GetMaterials = async (req, res) => {
    try {
        let sql = ` select * from materials `;
        const [result] = await conexion.query(sql);
        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(400).json({ message: "no se encontraron materiales en la BD"})
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor: " + error.message})
    }
}


export const PostMaterial = async (req, res) => {
  try {
    let {
      name_material
    } = req.body;


    let sql = `INSERT INTO materials (name_material)
               VALUES (?)`;
    const [result] = await conexion.query(sql, [name_material]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Se registró el material con éxito" });
    } else {
      res.status(404).json({ message: "No se pudo registrar el material" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};


export const DeleteMaterials = async (req, res) => {
    try {
      const { idmaterials } = req.params;
  
      if (!idmaterials) {
        return res.status(400).json({ message: "ID del material es requerido" });
      }
  
      const sql = 'DELETE FROM materials WHERE idmaterials = ?';
  
      const [response] = await conexion.query(sql, [idmaterials]);
  
      if (response.affectedRows > 0) {
        return res.status(200).json({ message: "material eliminado correctamente" });
      } else {
        return res.status(404).json({ message: "No se encontró el material con el ID proporcionado" });
      }
  
    } catch (error) {
      console.error("Error al eliminar el material:", error);
      return res.status(500).json({ message: "Error en la conexión: " + error.message });
    }
  };


  export const UpdateMaterials = async (req, res) => {
    try {
  
        const { id } = req.params;
        const materials = req.body;

        const [result] = await conexion.query("SELECT * FROM materials WHERE idmaterials = ?", [id]);
  
        if (result.length === 0) {
          return res.status(404).json({ message: "Material no encontrado" });
        }
  
        const datos = result[0];
  
        const update = { ...datos, ...materials };
  
        const [sql] = await conexion.query("UPDATE materials SET ? WHERE idmaterials = ?", [update, id]);
  
        res.json({ message: "Material actualizado" });
      } catch (error) {
      res.status(500).send(error.message);
    }
  };
  