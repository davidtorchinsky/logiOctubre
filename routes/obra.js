'use strict'

var express = require('express');
var api = express.Router();
var ObraController = require('../controllers/obra');

// GETS
api.get('/',ObraController.getObras);
// api.get('/:idMedico/:cuidObra',ObraController.editarObra);

// PATCH
api.patch('/:cuidObra',ObraController.editarObra);

// POST
api.post('/',ObraController.cargarObra);

// DELETE
api.delete('/:cuidObra', ObraController.eliminarObra)

module.exports = api;