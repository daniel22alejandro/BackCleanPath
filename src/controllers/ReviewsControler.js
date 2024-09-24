import { conexion } from "../database/conexion.js";

// Obtener todas las reseñas con el nombre del usuario, comentario de la respuesta y nombre del material
export const GetReviews = async (req, res) => {
  try {
    const sql = `
      SELECT r.idreviews, r.description, r.date, u.name_user, rep.comment AS reply_comment, m.name_material
      FROM reviews r
      JOIN users u ON r.users_idusers = u.idusers
      JOIN reply rep ON r.reply_idreply = rep.idreply
      JOIN materials m ON r.materials_idmaterials = m.idmaterials`;

    const [result] = await conexion.query(sql);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({ message: "No se encontraron reseñas en la BD" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};

// Crear una nueva reseña
export const PostReview = async (req, res) => {
  try {
    const { description, users_idusers, reply_idreply, materials_idmaterials } = req.body;

    // Verificar que el usuario exista
    const [userCheck] = await conexion.query("SELECT * FROM users WHERE idusers = ?", [users_idusers]);
    if (userCheck.length === 0) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    // Verificar que la respuesta exista
    const [replyCheck] = await conexion.query("SELECT * FROM reply WHERE idreply = ?", [reply_idreply]);
    if (replyCheck.length === 0) {
      return res.status(400).json({ message: "La respuesta no existe" });
    }

    // Verificar que el material exista
    const [materialCheck] = await conexion.query("SELECT * FROM materials WHERE idmaterials = ?", [materials_idmaterials]);
    if (materialCheck.length === 0) {
      return res.status(400).json({ message: "El material no existe" });
    }

    const sql = `INSERT INTO reviews (description, date, users_idusers, reply_idreply, materials_idmaterials) VALUES (?, ?, ?, ?, ?)`;
    const date = new Date(); // Establecer la fecha actual
    const [result] = await conexion.query(sql, [description, date, users_idusers, reply_idreply, materials_idmaterials]);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: "Se registró la reseña con éxito" });
    } else {
      res.status(404).json({ message: "No se pudo registrar la reseña" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};

// Eliminar una reseña
export const DeleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = 'DELETE FROM reviews WHERE idreviews = ?';
    const [response] = await conexion.query(sql, [id]);

    if (response.affectedRows > 0) {
      return res.status(200).json({ message: "Reseña eliminada correctamente" });
    } else {
      return res.status(404).json({ message: "No se encontró la reseña con el ID proporcionado" });
    }
  } catch (error) {
    console.error("Error al eliminar la reseña:", error);
    return res.status(500).json({ message: "Error en la conexión: " + error.message });
  }
};
