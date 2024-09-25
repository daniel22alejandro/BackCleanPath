import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";

// Obtener todas las respuestas y el nombre del usuario
export const GetReplies = async (req, res) => {
  try {
    const sql = `
      SELECT r.idreply, r.comment, r.date, u.name_user 
      FROM reply r 
      JOIN users u ON r.users_idusers = u.idusers`;
      
    const [result] = await conexion.query(sql);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(204).json({ message: "No se encontraron respuestas en la BD" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};

// Crear una nueva respuesta
export const PostReply = async (req, res) => {
  try {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
    const { comment, users_idusers } = req.body;

    // Verificar que el usuario exista
    const [userCheck] = await conexion.query("SELECT * FROM users WHERE idusers = ?", [users_idusers]);
    if (userCheck.length === 0) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    const sql = `INSERT INTO reply (comment, users_idusers, date) VALUES (?, ?, ?)`;
    const date = new Date(); // Establecer la fecha actual
    const [result] = await conexion.query(sql, [comment, users_idusers, date]);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: "Se registró la respuesta con éxito" });
    } else {
      res.status(404).json({ message: "No se pudo registrar la respuesta" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};

// Actualizar una respuesta
export const UpdateReply = async (req, res) => {
  try {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
    const { id } = req.params;
    const { comment, users_idusers } = req.body;

    // Verificar si la respuesta existe
    const [replyCheck] = await conexion.query("SELECT * FROM reply WHERE idreply = ?", [id]);
    if (replyCheck.length === 0) {
      return res.status(404).json({ message: "Respuesta no encontrada" });
    }

    // Verificar que el usuario exista
    const [userCheck] = await conexion.query("SELECT * FROM users WHERE idusers = ?", [users_idusers]);
    if (userCheck.length === 0) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    const sql = `UPDATE reply SET comment = ?, users_idusers = ? WHERE idreply = ?`;
    const [result] = await conexion.query(sql, [comment, users_idusers, id]);

    if (result.affectedRows > 0) {
      res.json({ message: "Respuesta actualizada con éxito" });
    } else {
      res.status(404).json({ message: "No se pudo actualizar la respuesta" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};

// Eliminar una respuesta
export const DeleteReply = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = 'DELETE FROM reply WHERE idreply = ?';
    const [response] = await conexion.query(sql, [id]);

    if (response.affectedRows > 0) {
      return res.status(200).json({ message: "Respuesta eliminada correctamente" });
    } else {
      return res.status(404).json({ message: "No se encontró la respuesta con el ID proporcionado" });
    }
  } catch (error) {
    console.error("Error al eliminar la respuesta:", error);
    return res.status(500).json({ message: "Error en la conexión: " + error.message });
  }
};
