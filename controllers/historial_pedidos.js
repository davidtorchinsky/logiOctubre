'use strict'

var Pedido = require('../models/pedido');
var HistorialPedido = require('../models/historial_pedidos');
var Medicamento =require('../models/medicamento');



// FUNCIONES
function getHistorial(req, res){
    console.log('- GET HISTORIAL -');
    console.log(req.params.idPed);

Historial_pedidos.find({pedido: req.params.idPed }, function (err, historial) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!historial) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: historial
        });
    });
}


function cargarHistorialPedido(req, res) {
    console.log('CARGAR HISTORIAL PEDIDO');

    if (!req.body.numeroPedido) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    console.log('numeroPedido'); console.log(req.body.numeroPedido);
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
    console.log('fechaPedido'); console.log(req.body.horaYFechaPedido);
    if (!req.body.cadenaFrioPedido) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }

    console.log("idpaciente "+req.body.idPacientePedido);

    if (!req.body.idPacientePedido) {
        return res.status(400).json({
            title: 'Error id paciente',
            error: err
        });
    }

    console.log("idMedicamento "+req.body.idMedicamentoPedido);
    if (!req.body.idMedicamentoPedido) {
        return res.status(400).json({
            title: 'Error id medicamento',
            error: err
        });
    }
    
  
    var nuevoPedido = new HistorialPedido({
        numero: req.body.numeroPedido,
        estado: req.body.estadoPedido,
        hora: req.body.horaYFechaPedido,
        cadenaFrio: req.body.cadenaFrioPedido,
    });
    nuevoPedido.Pedido=req.body.idPedido;
    nuevoPedido.idPaciente=req.body.idPacientePedido;
    nuevoPedido.idMedicamento=req.body.idMedicamentoPedido;
    console.log(nuevoPedido);
    
    console.log( nuevoPedido.idPaciente);
    console.log(nuevoPedido.idMedicamento);

    nuevoPedido.save().then(function (nuevoPedido) {
        res.status(201).json({
            message: 'Pedido creado',
            obj: nuevoPedido
        });

    }, function (err) {
        if (err.code == 11000) {
            var msj = ""
            //Catching index name inside errmsg reported by mongo to determine the correct error and showing propper message
            if (err.errmsg.toString().includes("idPed"))
                msj = "Numero Pedido";
           
            return res.status(404).json({
                title: 'Error',
                error: msj + ' pedido existente.'
            });
        }
        return res.status(404).json({
            title: 'Error',
            error: err
        });
    });
}




function eliminarHistorialPedidos(req, res){

    console.log('ELIMINAR historial pedido');
        
    console.log(req.params.idPedidos);


    HistorialPedidos.findOne({'_id': req.params.idPedido})
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
    getPedidos,getHistorial,
    cargarHistorialPedidos,
    eliminarHistorialPedidos,
  
}

