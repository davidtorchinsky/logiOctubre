'use strict'

var express = require('express');
var api = express.Router();
var PacienteController = require('../controllers/paciente');

// GETS
api.get('/',PacienteController.getPacientes);
// api.get('/:idMedico/:idPaciente',MedicoController.editarMedico);

// PATCH
api.patch('/:dniPacientes',PacienteController.editarPaciente);

// POST
api.post('/',PacienteController.cargarPaciente);

// DELETE
api.delete('/:dniPacientes', PacienteController.eliminarPaciente)

module.exports = api; 