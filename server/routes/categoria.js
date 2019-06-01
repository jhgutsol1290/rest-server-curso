const express = require('express')

const {verificaToken} = require('../middlewares/autenticacion')

const app = express()

const Categoria = require('../models/categoria')

//---------------------------
//Mostrar todas las categorias
//---------------------------
app.get('/categoria', (req, res)=>{
    
})

//---------------------------
//Mostrar una categoria por ID
//---------------------------
app.get('/categoria/:id', (req, res)=>{
    //Categoria.findById
})

//---------------------------
//Crear nueva categoria
//---------------------------
app.post('/categoria', verificaToken, (req, res)=>{
    //regresa la nueva categoria
    //req.usuario._id
})

//---------------------------
//Actualiza categoria
//---------------------------
app.put('/categoria/:id', (req, res)=>{

})

//---------------------------
//Elimina categoria
//---------------------------
app.delete('/categoria/:id', (req, res)=>{
    //solo un admon puede borrar categorias
    //Categoria.findByIdAndRemove
})




module.exports = app