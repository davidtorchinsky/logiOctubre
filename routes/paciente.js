'use strict'

var express = require('express');
var api = express.Router();
var PacienteController = require('../controllers/paciente');

// GETS
api.get('/',PacienteController.getPacientes);


// PATCH MODIFICACION
api.patch('/:idPaciente',PacienteController.editarPaciente);
<<<<<<< HEAD
api.patch('/agregarMedicamento/:idPaciente/:idMedicamento', PacienteController.cargarConsumicion);
api.patch('/quitarMedicamento/:idPaciente/:idMedicamento', PacienteController.quitarConsumicion);
=======
api.patch('/agregarMedicamento/:idPaciente/:_idMedicamento', PacienteController.cargarConsumicion);
//api.patch('/quitarMedicamento/:idPaciente/:idMedicamento', PacienteController.quitarConsumicion);
>>>>>>> master
api.patch('/agregarMedico/:idPaciente/:idMedico', PacienteController.cargarMedico);
api.patch('/agregarObraSocial/:idPaciente/:idObra', PacienteController.cargarObra);


// POST ALTA
api.post('/',PacienteController.cargarPaciente);

// DELETE
api.delete('/:idPaciente', PacienteController.eliminarPaciente)

module.exports = api; 