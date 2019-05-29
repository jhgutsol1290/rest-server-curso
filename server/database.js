const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/cafe',{
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(db=>console.log('DB is connected'))
    .catch(e=>console.error(e))