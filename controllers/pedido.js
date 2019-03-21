'use strict'

var Pedido = require('../models/pedido');
var medicamento =require('../models/medicamento');

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

    if (!req.params.idPaciente) {
        return res.status(400).json({
            title: 'Error id paciente',
            error: err
        });
    }
    if (!req.params.idMedicamento) {
        return res.status(400).json({
            title: 'Error id medicamento',
            error: err
        });
    }
    
  
    var nuevoPedido = new Pedido({
        numero: req.body.numeroPedido,
        estado: req.body.estadoPedido,
        hora: req.body.horaYFechaPedido,
        cadenaFrio: req.body.cadenaFrioPedido
        
      
    })
    nuevoPedido.idPaciente=req.body.idPaciente;
    nuevoPedido.idMedicamento=req.body.idMedicamento;
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



//cargo el pedido cuando agrego el medicamento

function cargarPedido2(req, res) {
    console.log('CARGAR PEDIDO 2');

   

    if (!req.params.idPaciente) {
        return res.status(400).json({
            title: 'Error id paciente',
            error: err
        });
    }
    if (!req.params.idMedicamento) {
        return res.status(400).json({
            title: 'Error id medicamento',
            error: err
        });
    }
    
  
    var nuevoPedido = new Pedido({
        numero: Pedido.find.Count()++,
        estado: "Generado",
        hora: Date.now(),
        cadenaFrio: medicamento.findById(req.params.idMedicamento).cadenaFrio
        
      
    })
    nuevoPedido.idPaciente=req.body.idPaciente;
    nuevoPedido.idMedicamento=req.body.idMedicamento;
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




function editarPedido(req, res) {
    console.log('EDITAR PEDIDO');
    console.log(req.params.idPedido);
    console.log(req.body.idPedido);
    Pedido.findById(req.params.idPedido, function (err, pedido) {
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


    Pedido.findOne({'_id': req.params.idPedido})
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

//Cargar un Repartidor

function cargarRepartidor(req, res) {
    console.log("entre cargar repartidor");
    
    //Asocio el repartidor al pedido
    Pedido.findById(req.params.idPedido, function (err, pedido) {
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

        console.log("repartidores: "+req.params.idRepartidor);  
        pedido.repartidor=req.params.idRepartidor;

        

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

    /*//Asocio el pedido a la Repartidor Social

    console.log("salida 3");
    Repartidor.findById(req.params.idRepartidor, function (err, repartidor) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!repartidor) {
            return res.status(404).json({
                title: 'Error',
                error: 'Repartidor no encontrado'
            });
        }
        repartidor.pedidos.push(req.params.idPedido );
       

        

        repartidor.save().then(function (repartidor) {
            res.status(200).json({
                message: 'Success',
                obj: repartidor
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });*/
}







// EXPORT
module.exports = {
    getPedidos,
    cargarPedido,
    editarPedido,
    eliminarPedido,
    cargarRepartidor,
    cargarPedido2
}

