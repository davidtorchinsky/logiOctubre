'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Relacion con pedido
/*pedido:{
    type: Schema.Types.ObjectId,
    ref: 'Pedido'
}*/

//Esquema Repartidor
var RepartidorSchema = Schema({
    dni: {
        type: String,
        unique: true
    },
    nombre: String,
    apellido: String,
    telefono: String,
    legajo: String
});
var Repartidor = mongoose.model('repartidores', RepartidorSchema);

module.exports = Repartidor;