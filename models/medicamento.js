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
    laboratorio: String,
    cantidadComprimidos: String
});
var Medicamento = mongoose.model('Medicamento', MedicamentosSchema);

module.exports = Medicamento;