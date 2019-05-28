require('./config/config')
const express = require('express')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(require('./routes/usuario'))

mongoose.connect('mongodb://localhost:27017/cafe',
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
).then(db=>console.log('DB connected'))
.catch(e=>console.log(e))


app.listen(process.env.PORT, ()=>{
    console.log('Server on port 3000')
})