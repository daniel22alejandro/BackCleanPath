import { conexion } from "../database/conexion.js"
import bcryptjs from 'bcryptjs';
import jwt from"jsonwebtoken"
import { validationResult } from "express-validator";

export const validarToken=async(req,res,next)=>{

let token_user=req.headers['token']
if(!token_user){
    res.status(402).json({"mensaje":"se requiere un token"})
}

else{
    const decode =jwt.verify(token_user,process.env.SECRET,(Error,decode)=>{
        if(Error){

            res.status(401).json({"mensaje":"token invalido"})
        }
        else {
            next()
        }
    })
}
}

export const ValidateUsers = async (req, res) => {
    try {
        
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
        let { email, password } = req.body;

        let sql = `
            SELECT idusers, name_user, email, password 
            FROM users 
            WHERE email = ?;
        `;

        const [resultado] = await conexion.query(sql, [email]);

        if (resultado.length > 0) {
            const usuario = resultado[0];
            const storedPasswordHash = usuario.password;

            const passwordMatch = await bcryptjs.compare(password, storedPasswordHash);

            if (passwordMatch) {
                const { password, ...DatosSesion } = usuario;

                let token = jwt.sign({ Usuario: DatosSesion }, process.env.SECRET, { expiresIn: process.env.TIME });
                return res.status(200).json({ Usuario_Logeado: { id: usuario.idusers, nombre: usuario.name_user }, token, message: 'Usuario autorizado' });
            } else {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        } else {
            return res.status(404).json({ message: 'Email o Contraseña incorrectos' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};
