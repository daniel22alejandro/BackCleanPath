import { conexion } from "../database/conexion.js";
import bcryptjs from "bcryptjs";


export const GetUsers = async (req, res) => {
    try {
        let sql = ` select * from users `;
        const [result] = await conexion.query(sql);
        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(400).json({ message: "no se encontraron usuarios en la BD"})
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor: " + error.message})
    }
}


export const PostUsers = async (req, res) => {
  try {
    let {
      name_user,
      email,
      password
    } = req.body;

    // Encriptar la contraseña
    const salt = await bcryptjs.genSalt(10);
    let hashPassword = await bcryptjs.hash(password, salt);

    // Usar la contraseña encriptada en la consulta
    let sql = `INSERT INTO users (name_user, email, password)
               VALUES (?, ?, ?)`;
    const [result] = await conexion.query(sql, [name_user, email, hashPassword]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Se registró el usuario con éxito" });
    } else {
      res.status(404).json({ message: "No se pudo registrar el usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};


export const DeleteUsers = async (req, res) => {
    try {
      const { idusers } = req.params;
  
      if (!idusers) {
        return res.status(400).json({ message: "ID de la usuario es requerido" });
      }
  
      const sql = 'DELETE FROM users WHERE idusers = ?';
  
      const [response] = await conexion.query(sql, [idusers]);
  
      if (response.affectedRows > 0) {
        return res.status(200).json({ message: "uusuario eliminado correctamente" });
      } else {
        return res.status(404).json({ message: "No se encontró el usuario con el ID proporcionado" });
      }
  
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      return res.status(500).json({ message: "Error en la conexión: " + error.message });
    }
  };
  
  export const UpdateUsers = async (req, res) => {
    try {
  
        const { id } = req.params;
        const users = req.body;
  
        const salt = await bcryptjs.genSalt(10);
  
        if (users.password) {
            users.password = await bcryptjs.hash(users.password, salt);
        }
  
        const [result] = await conexion.query("SELECT * FROM users WHERE idusers = ?", [id]);
  
        if (result.length === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
  
        const datos = result[0];
  
        const update = { ...datos, ...users };
  
        const [sql] = await conexion.query("UPDATE users SET ? WHERE idusers = ?", [update, id]);
  
        res.json({ message: "Usuario actualizado" });
      } catch (error) {
      res.status(500).send(error.message);
    }
  };
  