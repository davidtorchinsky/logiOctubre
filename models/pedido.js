'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Relacion con Paciente
/*paciente:{
    type: Schema.Types.ObjectId,
    ref: 'Paciente'
}*/


//Relacion con Repartidor
/*repartidor:{
    type: Schema.Types.ObjectId,
    ref: 'Repartidor'
}*/

//Relacion con Farmacia
/*farmacia:{
    type: Schema.Types.ObjectId,
    ref: 'Farmacia'
}*/

//Esquema pedido
var PedidoSchema = Schema({
    numero: {
        type: String,
        unique: true
    },
    estado: String,
    hora: Date,
    cadenaFrio: String
    
});
var Pedido = mongoose.model('pedidos', PedidoSchema);

module.exports = Pedido;