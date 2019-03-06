'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



//Esquema Repartidor
var RepartidorSchema = Schema({
    dni: {
        type: String,
        unique: true
    },
    nombre: String,
    apellido: String,
    telefono: String,
    legajo: String,

    /*//Relacion con pedido
pedidos:[{
    type: Schema.Types.ObjectId,
    ref: 'Pedido'
}]*/
});
var Repartidor = mongoose.model('repartidores', RepartidorSchema);

module.exports = Repartidor;