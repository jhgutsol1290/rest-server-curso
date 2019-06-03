const express = require('express')

const {verificaToken} = require('../middlewares/autenticacion')

const app = express()
const Producto = require('../models/producto')


//---------------------------
//Obtener todos los productos
//---------------------------
app.get('/producto', verificaToken, (req, res)=>{
    //trae todos los productos
    //populate: usuario categoria
    //paginado
    let desde = req.query.desde || 0
    desde = Number(desde)
    let hasta = req.query.hasta || 5
    hasta = Number(hasta)

    Producto.find({disponible: true})
                    .populate('usuario', 'nombre email')
                    .populate('categoria', 'descripcion')
                    .skip(desde)
                    .limit(hasta)
                    .exec((err, productosDB)=>{
                        if(err){
                            return res.send(500).json({
                                ok: false,
                                err
                            })
                        }

                        return res.json({
                            ok: true,
                            productos: productosDB
                        })

                    })
})

//---------------------------
//Obtener un porducto por ID
//---------------------------
app.get('/producto/:id', verificaToken, (req, res)=>{
    //populate: usuario categoria
    //paginado
    const id = req.params.id

    Producto.findById(id)
                .populate('usuario', 'nombre email')
                .populate('categoria', 'descripcion')
                .exec((err, productoDB)=>{
                    if(err){
                        return res.status(500).json({
                            ok: false,
                            err
                        })
                    }

                    if(!productoDB){
                        return res.status(400).json({
                            ok: false,
                            err:{
                                message: 'ID inexistente'
                            }
                        })
                    }


                    return res.json({
                        ok: true,
                        producto: productoDB
                    })
                })

})

//---------------------------
//Buscar producto
//---------------------------
app.get('/producto/buscar/:termino', verificaToken, (req, res)=>{

    let termino = req.params.termino

    let regex = new RegExp(termino, 'i')

    Producto.find({nombre: regex})
            .populate('categoria', 'descripcion')
            .exec((err,productosDB)=>{
                if(err){
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                res.json({
                    ok: true,
                    productos: productosDB
                })
            })

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
app.put('/producto/:id', verificaToken, (req, res)=>{
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
            return res.status(400).json({
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
app.delete('/producto/:id', verificaToken, (req, res)=>{
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
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'ID no existente'
                }
            })
        }

        if(productoDB.disponible === true){
            productoDB.disponible = false
        } else {
            productoDB.disponible = true
        }

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