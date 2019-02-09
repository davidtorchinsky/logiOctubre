'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Relacion con Clinica
clinicas:[{
    type: Schema.Types.ObjectId,
    ref: 'Clinica'
}]



//Relacion con Paciente
pacientes:[{
    type: Schema.Types.ObjectId,
    ref: 'Paciente'
}]


//Esquema Medico
var MedicoSchema = Schema({
    dni: {
        type: String,
        unique: true
    },
    nombre: String,
    apellido: String,
    telefono: String,
    matricula: String
});
var Medico = mongoose.model('medicos', MedicoSchema);

module.exports = Medico;