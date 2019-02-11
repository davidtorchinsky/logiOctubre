'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Relacion con Medico
medicos:[{
    type: Schema.Types.ObjectId,
    ref: 'Medico'
}]


//Esquema consume
var Consume = Schema({
    medicamento: {
        type: Schema.Types.ObjectId,
        ref: 'Medicamento'
    },
    cadaCuanto: Number,
    cantidadConsume: Number,
    restante: Number,
    
});

//Esquema paciente
var pacienteSchema = Schema({
    dni: {
        type: String,
        unique: true
    },
    nombre: String,
    apellido: String,
    telefono: String,
    direccion: String,
    fechaNacimiento: Date,

    conumisiones:[Consume]
    
});

var Paciente = mongoose.model('Pacientes', pacienteSchema);

module.exports = Paciente;