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
    },
    //Relacion con medicamento
    medicamento:[{
        type: Schema.Types.ObjectId,
        ref: 'Medicamento'
    }]
});
var Farmacia = mongoose.model('farmacias', FarmaciaSchema);

module.exports = Farmacia;