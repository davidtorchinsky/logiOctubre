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
var obraRoutes = require('./routes/obra');
var medicamentoRoutes=require('./routes/medicamento');
var pacienteRoutes=require('./routes/paciente');
var repartidorRoutes=require('./routes/repartidor'); 




// USAR ROUTES
app.use('/medico', medicoRoutes);
app.use('/obra', obraRoutes);
app.use('/medicamento', medicamentoRoutes);
app.use('/paciente', pacienteRoutes);
app.use('/repartidor', repartidorRoutes);



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

