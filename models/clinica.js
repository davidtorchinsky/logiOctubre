'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Relacion con Medico
medicos:[{
    type: Schema.Types.ObjectId,
    ref: 'Medico'
}]


//Esquema Clinica
var ClinicaSchema = Schema({
    idClinica: {
        type: String,
        unique: true
    },
    nombre: String,
    direccion: String,
    telefono: String,
    email: String
});
var Clinica = mongoose.model('clinicas', ClinicaSchema);

module.exports = Clinica;