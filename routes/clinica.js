'use strict'

var express = require('express');
var api = express.Router();
var ClinicaController = require('../controllers/clinica');

// GETS
api.get('/',ClinicaController.getClinicas);
api.get('/noAsignada/:idMedico',ClinicaController.getClinicasNoAsignadasMedico);
// api.get('/:idMedico/:idClinica',MedicoController.editarMedico);

// PATCH MODIFICACION
api.patch('/:idClinica',ClinicaController.editarClinica);

// POST ALTA
api.post('/',ClinicaController.cargarClinica);

// DELETE
api.delete('/:idClinica', ClinicaController.eliminarClinica)

module.exports = api; 