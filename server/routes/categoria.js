const express = require('express')

const {verificaToken, verificaAdmin_Role} = require('../middlewares/autenticacion')

const app = express()

const Categoria = require('../models/categoria')

//---------------------------
//Mostrar todas las categorias
//---------------------------
app.get('/categoria', verificaToken, (req, res)=>{
    
    Categoria.find({})
        .populate('usuario', 'nombre email')
        .sort('descripcion')
        .exec((err, categoriaDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        })
    })

})

//---------------------------
//Mostrar una categoria por ID
//---------------------------
app.get('/categoria/:id', verificaToken, (req, res)=>{
    const id = req.params.id

    Categoria.findById(id, (err, categoriaDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!categoriaDB){
            return res.status(500).json({
                ok: false,
                err:{
                    message: 'El ID no es correcto'
                }
            })
        }

        return res.json({
            ok: true,
            id,
            categoria: categoriaDB
        })

    })

})

//---------------------------
//Crear nueva categoria
//---------------------------
app.post('/categoria', verificaToken, (req, res)=>{
    //regresa la nueva categoria
    //req.usuario._id

    const body = req.body
    const usuario = req.usuario._id

    const categoria = new Categoria({
        descripcion: body.descripcion,
        usuario
    })

    categoria.save((err, categoriaDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        })

    })
})

//---------------------------
//Actualiza categoria
//---------------------------
app.put('/categoria/:id', (req, res)=>{
    const id = req.params.id
    const body = req.body

    const descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, {new: true, runValidators: true}, (err, categoriaDB)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        })

    })
})

//---------------------------
//Elimina categoria
//---------------------------
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res)=>{
    //solo un admon puede borrar categorias
    //Categoria.findByIdAndRemove

    const id = req.params.id

    Categoria.findByIdAndRemove(id, (err, categoriaDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El id no existe"
                }
            })
        }

        return res.json({
            ok: true,
            messae: 'Categoría borrada'
        })

    })
})


module.exports = app