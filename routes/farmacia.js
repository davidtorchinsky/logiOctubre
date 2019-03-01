'use strict'

var express = require('express');
var api = express.Router();
var FarmaciaController = require('../controllers/farmacia');

// GETS
api.get('/',FarmaciaController.getFarmacias);
// api.get('/:idMedico/:idFarmacia',MedicoController.editarMedico);

// PATCH MODIFICACION
api.patch('/:idFarmacia',FarmaciaController.editarFarmacia);
api.patch('/agregarMedicamento/:idFarmacia/:idMedicamento', FarmaciaController.cargarMedicamento);

// POST ALTA
api.post('/',FarmaciaController.cargarFarmacia);

// DELETE
api.delete('/:idFarmacia', FarmaciaController.eliminarFarmacia)

module.exports = api; 