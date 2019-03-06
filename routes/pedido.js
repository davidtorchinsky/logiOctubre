'use strict'

var express = require('express');
var api = express.Router();
var PedidoController = require('../controllers/pedido');

// GETS
api.get('/',PedidoController.getPedidos);
// api.get('/:idMedico/:idPaciente',MedicoController.editarMedico);

// PATCH
api.patch('/:idPedido',PedidoController.editarPedido);
api.patch('/agregarRepartidor/:idPedido/:idRepartidor', PedidoController.cargarRepartidor);

// POST
api.post('/',PedidoController.cargarPedido);

// DELETE
api.delete('/:idPedido', PedidoController.eliminarPedido)//ver el idPed

module.exports = api; 