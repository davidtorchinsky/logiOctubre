const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000

var app = express()

var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://localhost:27017/Logi_Oct", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true},{limit: '100mb'}));
app.use(bodyParser.json({limit: '100mb'}));
app.use(express.static(__dirname));
app.use(cors());

// DECLARAR ROUTES
var medicoRoutes = require('./routes/medico');


// USAR ROUTES
app.use('/medico', medicoRoutes);


app.listen(port, () => console.log('Servidor Corriendo!'))

const mysql = require('mysql');//se conecta a la bd

module.exports=()=> {
	return mysql.createConnection({
		//host: 'direccion ip del servidor'
		host: 'localhost',
		user: 'root',
		password: '123',
		database: 'logistica_medicamentos',
		port: 3306
	})
}

module.exports = app;

