import express from 'express'
import bodyParser from 'body-parser'
import routeUsers from './src/routes/UserRoute.js'
import routeMaterials from './src/routes/MaterialsRoute.js'
import routeReply from './src/routes/ReplyRoute.js'
import routeReviews from './src/routes/ReviewsRoute.js'
import routeAuth from './src/routes/AuthRoute.js'
import path from 'path';
import { fileURLToPath } from 'url';


const servidor = express()

servidor.use(bodyParser.json())

servidor.use(bodyParser.urlencoded({extended: false}))
servidor.use(express.json());


//Imagenes

//OBTENER EL NOMBRE DE LA CARPETA 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//HACER PUBLICA LA CARPETA PUBLIC PARA PODER ACCEDER A ELLA EN EL FRONTEND
servidor.use('/public', express.static(path.join(__dirname, 'public')));


// rutas
routeUsers(servidor)
servidor.use('/materials', routeMaterials)
servidor.use('/reply', routeReply)
servidor.use('/reviews',routeReviews)
servidor.use('/validate', routeAuth)




servidor.listen(3000, ()=>{
    console.log('Servidor corriendo en el puerto 3000')
})