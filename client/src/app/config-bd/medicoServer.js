const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');

const app= express();

//configuracion de la app
app.set('port', process.env.PORT || 3000);// si no le otorgan un puerto asigna el 3000
app.set('medico', 'html');
app.set('medico', path.join(__dirname,'../app/medico'));//configuro la direccion en donde esta ubicada mi vista

//middleware

app.use(bodyParser.urlencoded({extended: false}));

module.exports=app;