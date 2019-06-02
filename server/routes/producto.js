const express = require('express')

const {verificaToken} = require('../middlewares/autenticacion')

const app = express()
const Producto = require('../models/producto')


//---------------------------
//Obtener todos los productos
//---------------------------
app.get('/productos', (req, res)=>{
    //trae todos los productos
    //populate: usuario categoria
    //paginado
})

//---------------------------
//Obtener un porducto por ID
//---------------------------
app.get('/productos/:id', (req, res)=>{
    //populate: usuario categoria
    //paginado
})

//---------------------------
//Crear un nuevo producto
//---------------------------
app.post('/producto', verificaToken, (req, res)=>{
    //grabar el usuario
    //grabar una categoria del listado
    const body = req.body

    const producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    })

    producto.save((err, productoDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!productoDB){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        return res.json({
            ok: true,
            producto: productoDB
        })


    })



})

//---------------------------
//Actualizar un porducto por ID
//---------------------------
app.put('/producto/:id', (req, res)=>{
    //grabar el usuario
    //grabar una categoria del listado

    const id = req.params.id
    const body = req.body

    Producto.findById(id, (err, productoDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!productoDB){
            return res.status(500).json({
                ok: false,
                err:{
                    message: 'ID no existente'
                }
            })
        }

        productoDB.nombre = body.nombre
        productoDB.precioUni = body.precioUni
        productoDB.categoria = body.categoria
        productoDB.disponible = body.disponible
        productoDB.descripcion = body.descripcion

        productoDB.save((err, productoGuardado)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            return res.json({
                ok: true,
                producto: productoGuardado
            })
        })
    })
})

//---------------------------
//Eliminar un porducto por ID
//---------------------------
app.delete('/producto/:id', (req, res)=>{
    //cambiar estado de disponible a false
    const id = req.params.id

    Producto.findById(id, (err, productoDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!productoDB){
            return res.status(500).json({
                ok: false,
                err:{
                    message: 'ID no existente'
                }
            })
        }

        productoDB.disponible = false

        productoDB.save((err, productoInactivo)=>{
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            return res.json({
                ok: true,
                producto: productoInactivo
            })
        })



    })
})


module.exports = app