require('./config/config')
const express = require('express')

const app = express()

//configuracion del body-parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Configuracion global de rutas
app.use(require('./routes/index'))

//conexión a la base de datos
require('./database')


app.listen(process.env.PORT, ()=>{
    console.log('Server on port 3000')
})