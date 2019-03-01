'use strict'

var express = require('express');
var api = express.Router();
var MedicoController = require('../controllers/medico');

// GETS
api.get('/',MedicoController.getMedicos);
// api.get('/:idMedico/:idPaciente',MedicoController.editarMedico);

// PATCH
api.patch('/:idMedico',MedicoController.editarMedico);
api.patch('/agregarClinica/:idMedico/:idClinica', PacienteController.cargarMedico);

// POST
api.post('/',MedicoController.cargarMedico);

// DELETE
api.delete('/:idMedico', MedicoController.eliminarMedico)

module.exports = api;