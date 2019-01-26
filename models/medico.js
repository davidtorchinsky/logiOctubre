var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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