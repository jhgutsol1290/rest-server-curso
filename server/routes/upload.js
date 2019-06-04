const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

//default options
app.use(fileUpload({useTempFiles: true}));

app.put('/upload/:tipo/:id', (req, res)=>{

    const tipo = req.params.tipo
    const id = req.params.id

    if(!req.files){
        return res.status(400).json({
            ok: false,
            err:{
                message: 'No se ha seleccionado ningún archivo'
            }
        })
    }

    //Validar tipo
    let tiposValidos = ['producto', 'usuario']
    if(tiposValidos.indexOf( tipo ) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: `Los tipos válidos son: ${tiposValidos.join(', ')}`,
                extension
            }
        })
    }



    let archivo = req.files.archivo

    let nombreCortado = archivo.name.split('.')

    let extension = nombreCortado[nombreCortado.length - 1]

    //extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'JPG']

    if(extensionesValidas.indexOf( extension ) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: `El archivo con extensión: ${extension} no es válido. Las extensiones permitidas son: ${extensionesValidas.join(', ')}`,
                extension
            }
        })
    }


    archivo.mv(`uploads/${archivo.name}.jpg`, (err)=>{
        if(!req.files){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        return res.json({
            ok: true,
            message: 'Imagen subida correctamente'
        })

    })


})



module.exports = app