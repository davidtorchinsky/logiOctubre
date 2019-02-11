'use strict'

var express = require('express');
var api = express.Router();
var PacienteController = require('../controllers/paciente');

// GETS
api.get('/',PacienteController.getPacientes);
// api.get('/:idMedico/:idPaciente',MedicoController.editarMedico);

// PATCH
api.patch('/:idPacientes',PacienteController.editarPaciente);

// POST
api.post('/',PacienteController.cargarPaciente);

// DELETE
api.delete('/:idPacientes', PacienteController.eliminarPaciente)

module.exports = api; 