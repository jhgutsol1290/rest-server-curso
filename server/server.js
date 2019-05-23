require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/usuario', (req, res)=>{
    res.json('get Usuario')
})

app.post('/usuario', (req, res)=>{
    
    const body = req.body

    if(body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: 'EL nombre es necesario'
        })
    }else{
        res.json({
            persona: body
        })
    }
})
    
    

app.put('/usuario/:id', (req, res)=>{

    let id = req.params.id

    res.json({
        id
    })
})

app.delete('/usuario', (req, res)=>{
    res.json('delete Usuario')
})

app.listen(process.env.PORT, ()=>{
    console.log('Server on port 3000')
})