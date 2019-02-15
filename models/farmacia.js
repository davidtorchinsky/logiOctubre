'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema farmacia
var FarmaciaSchema = Schema({
    cuit: {
        type: String,
        unique: true
    },
    nombre: String,
    direccion: String,
    telefono: String,
    email: String,

    //Relacion con pedido
    pedido:{
        type: Schema.Types.ObjectId,
        ref: 'Pedido'
}
});
var Farmacia = mongoose.model('farmacias', FarmaciaSchema);

module.exports = Farmacia;