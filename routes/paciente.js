'use strict'

var express = require('express');
var api = express.Router();
var PacienteController = require('../controllers/paciente');

// GETS
api.get('/',PacienteController.getPacientes);
// api.get('/:idMedico/:idPaciente',MedicoController.editarMedico);

// PATCH MODIFICACION
api.patch('/:idPaciente',PacienteController.editarPaciente);
api.patch('/agregarMedicamento/:idPaciente/:idMedicamento', PacienteController.cargarConsumicion);
api.patch('/agregarMedico/:idPaciente/:idMedico', PacienteController.cargarMedico);
api.patch('/agregarObraSocial/:idPaciente/:idObra', PacienteController.cargarObra);


// POST ALTA
api.post('/',PacienteController.cargarPaciente);

// DELETE
api.delete('/:idPaciente', PacienteController.eliminarPaciente)

module.exports = api; 