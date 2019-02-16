'use strict'

var express = require('express');
var api = express.Router();
var PacienteController = require('../controllers/paciente');

// GETS
api.get('/',PacienteController.getPacientes);
// api.get('/:idMedico/:idPaciente',MedicoController.editarMedico);

// PATCH MODIFICACION
api.patch('/:idPaciente',PacienteController.editarPaciente);
api.patch('/:idPaciente/:idMedicamento', PacienteController.cargarConsumicion);
api.patch('/:idPaciente/:idMedico', PacienteController.cargarMedico);

// POST ALTA
api.post('/',PacienteController.cargarPaciente);

// DELETE
api.delete('/:idPaciente', PacienteController.eliminarPaciente)

module.exports = api; 