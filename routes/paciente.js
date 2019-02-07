'use strict'

var express = require('express');
var api = express.Router();
var PacineteController = require('../controllers/paciente');

// GETS
api.get('/',PacineteController.getPacinetes);
// api.get('/:idPacinete/:idPaciente',PacineteController.editarPacinete);

// PATCH
api.patch('/:idPacinete',PacineteController.editarPacinete);

// POST
api.post('/',PacineteController.cargarPacinete);

// DELETE
api.delete('/:idPacinete', PacineteController.eliminarPacinete)

module.exports = api;