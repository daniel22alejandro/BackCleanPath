import express from 'express'
import bodyParser from 'body-parser'
import routeUsers from './src/routes/UserRoute.js'
import routeMaterials from './src/routes/MaterialsRoute.js'
import routeReply from './src/routes/ReplyRoute.js'
import routeReviews from './src/routes/ReviewsRoute.js'

const servidor = express()

servidor.use(bodyParser.json())

servidor.use(bodyParser.urlencoded({extended: false}))
servidor.use(express.json());

// rutas
servidor.use('/users',routeUsers)
servidor.use('/materials', routeMaterials)
servidor.use('/reply', routeReply)
servidor.use('/reviews',routeReviews)




servidor.listen(3000, ()=>{
    console.log('Servidor corriendo en el puerto 3000')
})