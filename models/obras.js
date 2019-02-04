'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObrasSchema = Schema({
    cuit: {
        type: String,
        unique: true
    },
    nombre: String,
    direccion: String,
    telefono: String,
    email: String
});
var Obra = mongoose.model('obras', ObrasSchema);

module.exports = Obra;