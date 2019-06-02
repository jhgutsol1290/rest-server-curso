//--------------------
//Puerto
//---------------------
process.env.PORT = process.env.PORT || 3000


//--------------------
//Vencimiento del token
//---------------------
//60 segundos 60 minutos 24 horas 30 días
process.env.CADUCIDAD_TOKEN = '48h'


//--------------------
//SEED de autenticación
//---------------------
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

//--------------------
//Google Client ID
//---------------------
process.env.CLIENT_ID = process.env.CLIENT_ID || '834913747271-mr3ehq2fgvj1kmdpjr9u7giledogls6d.apps.googleusercontent.com'