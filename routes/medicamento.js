'use strict'

var express = require('express');
var api = express.Router();
var MedicamentoController = require('../controllers/medicamento');

// GETS
api.get('/',MedicamentoController.getMedicamentos);
api.get('/:idPaciente',MedicamentoController.getMedicamentosPaciente);
api.get('/noConsume/:idPaciente',MedicamentoController.getMedicamentosNoConsumePaciente);
// api.get('/:idMedico/:idPaciente',MedicoController.editarMedico);

// PATCH
api.patch('/:idMedicamentos',MedicamentoController.editarMedicamento);

// POST
api.post('/',MedicamentoController.cargarMedicamento);

// DELETE
api.delete('/:idMedicamentos', MedicamentoController.eliminarMedicamento)

module.exports = api; 