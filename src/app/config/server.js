const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');

const app= express();

//configuracion de la app
app.set('port', process.env.PORT || 3000);// si no le otorgan un puerto asigna el 3000
app.set('view engine', 'html');//revisasr si es html
app.set('login', path.join(__dirname,'../app/login'));//configuro la direccion en donde esta ubicada mi vista

//middleware

app.use(bodyParser.urlencoded({extended: false}));

module.exports=app;