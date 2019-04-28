'use strict'

var Pedido = require('../models/pedido');
var Medicamento =require('../models/medicamento');
const CronJob= require('../node_modules/cron/lib/cron').CronJob;// necesario para la tarea una vez al dia. 
var Paciente=require('../models/paciente');

//Creo los pedidos automaticamente.
const job=new CronJob('*/10 * * * * *', function(){


    //Decremento en 1 los dias restantes.
    console.log('comienza tarea');
    Paciente.findOne({}),function(err, pac){console.log(pac)}
    {

    }
    Paciente.updateMany({"consumiciones.diasRestantes": {$gte:-20}},
    {$inc: {"consumiciones.$.diasRestantes":-1}});
    


    /*//Busco los pacientes que poseen menos de 7 dias de consumiciones y les genero un pedido nuevo.
    Paciente.find({"consumiciones.diasRestantes":{$lte:7}}),function (err, pacientes){
        console.log(pacientes[0].nombre);
        pacientes.forEach(elementPac=>{
            //obtener las consumiciones y verificar si diasRestantes es menor a 7
            console.log(elementPac._id);
            elementPac.consumiciones.forEach(elemConsu=>{

                if(elemConsu.diasRestantes<=7)
                {
                    Pedido.countDocuments({}, function(err, count) 
                    {             
                
                        var num=count+1;//numerdo de pedido
                        console.log(elemConsu.medicamento);
                        
                        var nuevoPedido = new Pedido({ 
                              
                            numero: num,
                        
                            estado: "Generado",
                            hora: Date.now(),
                            //a partir de aca no funciona.
                            //cadenaFrio: medicamento[0].cadenaFrio,
                            medica: elemConsu.medicamento,
                            pac:elementPac._id
                        
                      
                        });
                        nuevoPedido.idPaciente=elementPac._id;
                        nuevoPedido.idMedicamento=elemConsu.medicamento;
                        console.log("Todos los datos del pedido "+nuevoPedido);
                        console.log("El id del paciente: "+nuevoPedido.pac);
                        console.log("El id del medicamento: "+nuevoPedido.medica);
                
                        nuevoPedido.save().then(function (nuevoPedido) {
                            res.status(201).json({
                            message: 'Pedido creado',
                            obj: nuevoPedido
                            });
                
                        });
                    })        
                }

            });


        });
            
    };*/
});
console.log('pedido de tarea');


job.start();







// FUNCIONES
function getPedidos(req, res){
    console.log('- GET PEDIDOS -');
    Pedido.find({'estado': { $not: { $eq: "Entregado"}}}).populate({path: 'medica', select:'nombre', model:'Medicamento'}).populate({path:'pac',select: ['apellido','direccion'], model: 'Paciente'})
    .populate({path:'repartidor', select: 'apellido', model:'Repartidor'}).exec( function (err, pedidos) {
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
        console.log(pedidos);
        res.status(200).json({
            message: 'Success',
            obj: pedidos
        });
    });
}

function getPedidosEntregados(req, res){
    console.log('- GET PEDIDOS ENTREGADOS -');
    Pedido.find({estado: 'Entregado'}).populate({path: 'medica', select:'nombre', model:'Medicamento'}).populate({path:'pac',select: ['apellido','direccion'], model: 'Paciente'})
    .populate({path:'repartidor', select: 'apellido', model:'Repartidor'}).exec( function (err, pedidos) {
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
        console.log(pedidos);
        res.status(200).json({
            message: 'Success',
            obj: pedidos
        });
    });
}












function getPedidosEntreFechas(req, res){
    console.log('- GET PEDIDOS ENTRE FECHAS-');
    Pedido.find(req.params.fechaInicio<Pedido.horaYFechaPedido<Pedido.horaYFechaPedido, function (err, pedidos) {
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
    
  
    var nuevoPedido = new Pedido({
        numero: req.body.numeroPedido,
        estado: req.body.estadoPedido,
        hora: req.body.horaYFechaPedido,
        cadenaFrio: req.body.cadenaFrioPedido,
    });
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



//cargo el pedido cuando agrego el medicamento

function cargarPedido2(req, res) {
    console.log('CARGAR PEDIDO 2');
    
    Pedido.countDocuments({}, function(err, count) {
        if (err) { return handleError(err) } //handle possible errors
        console.log("Cantidad de pedidos hasta el momento:",count)
        //and do some other fancy stuff
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
        var num=count+1;
        console.log(req.params.idMedicamento);
        Medicamento.find({"_id":req.params.idMedicamento}, function (err, medicamento) {
            if (err) {
                return res.status(400).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!medicamento) {
                return res.status(404).json({
                    title: 'Error',
                    error: 'Medicamento no encontrado'
                });
            }
    
            console.log("Numero pedido nuevo:",num);
            console.log("El medicamento es:",medicamento);
            //console.log("cadena de frio:",medicamento[0].cadenaFrio);
            var nuevoPedido = new Pedido({ 
              
            numero: num,
        
            estado: "Generado",
            hora: Date.now(),
        //a partir de aca no funciona.
           cadenaFrio: medicamento[0].cadenaFrio,
            medica: medicamento[0]._id,
            pac:req.params.idPaciente
        
      
            })
            nuevoPedido.idPaciente=req.params.idPaciente;
            nuevoPedido.idMedicamento=req.params.idMedicamento;
            console.log("Todos los datos del pedido "+nuevoPedido);
            console.log("El id del paciente: "+nuevoPedido.pac);
            console.log("El id del medicamento: "+nuevoPedido.medica);

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
        });        
    })
    
}




function editarPedido(req, res) {
    console.log('EDITAR PEDIDO');
    console.log(req.params.idPedido);
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
console.log("pedido viejo "+pedido);
        pedido.estado = req.body.estadoPedido;
        pedido.horaYFecha = req.body.horaYFechaPedido;
 

        console.log("pedido nuevo: "+pedido);
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
}


function quitarConsumicionPedido(req, res) {

    
    
    
}


// EXPORT
module.exports = {
    getPedidos,
    getPedidosEntregados,
    getPedidosEntreFechas,
    cargarPedido,
    editarPedido,
    eliminarPedido,
    cargarRepartidor,
    cargarPedido2,
    quitarConsumicionPedido
}

