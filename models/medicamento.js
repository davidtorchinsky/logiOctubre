'use strict'; 
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MedicamentosSchema = Schema({
    idMedicamento: {
        type: String,
        unique: true
    },
    nombre: String,
    //laboratorio: String,
    dosis: String,
    cadenaFrio: String,
    cantidadComprimidos: String
});
var Medicamento = mongoose.model('medicamentos', MedicamentosSchema);

module.exports = Medicamento;