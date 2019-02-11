'use strict'

var Pedido = require('../models/pedido');

// FUNCIONES
function getPedidos(req, res){
    console.log('- GET PEDIDOS -');
    Pedido.find({}, function (err, pedidos) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!pedidos) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: pedidos
        });
    });
}

function cargarPedido(req, res) {
    console.log('CARGAR PEDIDO');

    if (!req.body.numeroPedido) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.estadoPedido) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.horaYFechaPedido) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.cadenaFrioPedido) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    
  
    var nuevoPedido = new Pedido({
        numeroPedido: req.body.idPedido,
        estado: req.body.estadoPedido,
        horaYFecha: req.body.horaYFechaPedido,
        cadenaFrio: req.body.cadenaFrioPedido
        
      
    })

    console.log(nuevoPedido);

    nuevoPedido.save().then(function (nuevoPedido) {
        res.status(201).json({
            message: 'Pedido creado',
            obj: nuevoPedido
        });

    }, function (err) {
        if (err.code == 11000) {
            var msj = ""
            //Catching index name inside errmsg reported by mongo to determine the correct error and showing propper message
            if (err.errmsg.toString().includes("idPedido"))
                msj = "Id Pedido";
           
            return res.status(404).json({
                title: 'Error',
                error: msj + ' existente.'
            });
        }
        return res.status(404).json({
            title: 'Error',
            error: err
        });
    });
}

function editarPedido(req, res) {
    console.log('EDITAR PEDIDO');
    console.log(req.params.idPedido);
    console.log(req.body.idPedido);
    Pedido.findById(req.params.idPedidos, function (err, pedido) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!pedido) {
            return res.status(404).json({
                title: 'Error',
                error: 'Pedido no encontrado'
            });
        }

        pedido.estado = req.body.estadoPedido;
        pedido.horaYFecha = req.body.horaYFechaPedido;
        pedido.cadenaFrio = req.body.cadenaFrioPedido;        

        pedido.save().then(function (pedido) {
            res.status(200).json({
                message: 'Success',
                obj: pedido
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}

function eliminarPedido(req, res){

    console.log('ELIMINAR pedido');
        
    console.log(req.params.idPedidos);


    Pedido.findOne({'_id': req.params.idPedidos})
    .exec(function (err, pedido) {
        if (pedido) {
            pedido.remove().then(function (pedidoEliminado) {
                return res.status(200).json({
                    message: 'pedido eliminado correctamente',
                    obj: pedidoEliminado
                });
            }, function (err) {
                return res.status(400).json({
                    title: 'Error',
                    error: err.message
                });
            });
        }
        else {
            return res.status(404).json({
                title: 'Error',
                error: err.message
            });
        }
    });
}

// EXPORT
module.exports = {
    getPedidos,
    cargarPedido,
    editarPedido,
    eliminarPedido
}

