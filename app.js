const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000

var app = express()

var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://localhost:27017/Logi_Oct", { useNewUrlParser: true });

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true},{limit: '100mb'}));
app.use(bodyParser.json({limit: '100mb'}));
app.use(express.static(__dirname));

//CORS
app.use(cors());

// DECLARAR ROUTES
var medicoRoutes = require('./routes/medico');
var obraRoutes = require('./routes/obra');
var medicamentoRoutes=require('./routes/medicamento');
var pacienteRoutes=require('./routes/paciente');
var repartidorRoutes=require('./routes/repartidor'); 
var pedidoRoutes=require('./routes/pedido');
var farmaciaRoutes=require('./routes/farmacia');
var clinicaRoutes=require('./routes/clinica');
var historialPacienteRoutes=require('./routes/historial_paciente');
var historialPedidosRoutes=require('./routes/historial_pedidos');


// USAR ROUTES
app.use('/medico', medicoRoutes);
app.use('/obra', obraRoutes);
app.use('/medicamento', medicamentoRoutes);
app.use('/paciente', pacienteRoutes);
app.use('/repartidor', repartidorRoutes);
app.use('/pedido', pedidoRoutes);
app.use('/farmacia', farmaciaRoutes);
app.use('/clinica', clinicaRoutes);
app.use('/historial_paciente',historialPacienteRoutes);
app.use('/historial_pedidos',historialPedidosRoutes);


app.listen(port, () => console.log('Servidor Corriendo!'));

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

