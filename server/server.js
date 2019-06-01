require('./config/config')
const express = require('express')
const path = require('path')

const app = express()

//configuracion del body-parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//habilitar carpeta public para que se pueda ccaeder desde cualquier lugar
app.use(express.static(path.join(__dirname, '../public')))

//Configuracion global de rutas
app.use(require('./routes/index'))

//conexión a la base de datos
require('./database')


app.listen(process.env.PORT, ()=>{
    console.log('Server on port 3000')
})