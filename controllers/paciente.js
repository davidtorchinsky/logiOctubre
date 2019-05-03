'use strict'

var Paciente = require('../models/paciente');
var Medico = require('../models/medico');
var Obra=require('../models/obras');
var Pedido= require('../models/pedido');
var Medicamento= require('../models/medicamento');

// FUNCIONES
function getPacientes(req, res){
    console.log('- GET PACIENTES -');
    Paciente.find({}, function (err, pacientes) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!pacientes) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: pacientes
        });
    });
}

function getPacienteID(req, res){
    console.log('- GET PACIENTES -');
    Paciente.findById(req.params.idPaciente, function (err, pacientes) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!pacientes) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: pacientes
        });
    });
}

//Obtengo los pacientes de un determinado pedido
function getPacientePedido(req, res){
    console.log('- GET PACIENTE PEDIDO -');
    var query = Pedido.findById(req.params.idPedido);
    
    query.populate({
        path: 'pacienete',
        model: 'Paciente'
    })
    .exec(function (err, pedido) {
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
        res.status(200).json({
            message: 'Success',
            obj: pedido.paciente
        }); 
    });
}


function cargarPaciente(req, res) {
    console.log('CARGAR PACIENTE');

    if (!req.body.dniPaciente) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.nombrePaciente) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.apellidoPaciente) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.telefonoPaciente) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.direccionPaciente) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.barrioPaciente) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.fechaNacimientoPaciente) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    
  
    var nuevoPaciente = new Paciente({
        dni: req.body.dniPaciente,
        nombre: req.body.nombrePaciente,
        apellido: req.body.apellidoPaciente,
        telefono: req.body.telefonoPaciente,
        direccion: req.body.direccionPaciente,
        barrio: req.body.barrioPaciente,
        fechaNacimiento:req.body.fechaNacimientoPaciente
      
    })

    console.log(nuevoPaciente);

    nuevoPaciente.save().then(function (nuevoPaciente) {
        res.status(201).json({
            message: 'Paciente creado',
            obj: nuevoPaciente
        });

    }, function (err) {
        if (err.code == 11000) {
            var msj = ""
            //Catching index name inside errmsg reported by mongo to determine the correct error and showing propper message
            if (err.errmsg.toString().includes("dni"))
                msj = "DNI Paciente";
           
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

function editarPaciente(req, res) {
    console.log('EDITAR PACIENTE');
    console.log(req.params.idPaciente);
    console.log(req.body.idPaciente);
    Paciente.findById(req.params.idPaciente, function (err, paciente) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!paciente) {
            return res.status(404).json({
                title: 'Error',
                error: 'Paciente no encontrado'
            });
        }

        paciente.nombre = req.body.nombrePaciente;
        paciente.apellido = req.body.apellidoPaciente;
        paciente.telefono = req.body.telefonoPaciente;
        paciente.direccion = req.body.direccionPaciente;
        paciente.barrio = req.body.barrioPaciente;
        paciente.fechaNacimiento=req.body.fechaNacimientoPaciente

        paciente.save().then(function (paciente) {
            res.status(200).json({
                message: 'Success',
                obj: paciente
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}

function eliminarPaciente(req, res){

    console.log('ELIMINAR paciente');
        
    console.log(req.params.idPaciente);


    Paciente.findOne({'_id': req.params.idPaciente})
    .exec(function (err, paciente) {
        if (paciente) {
            paciente.remove().then(function (pacienteEliminado) {
                return res.status(200).json({
                    message: 'paciente eliminado correctamente',
                    obj: pacienteEliminado
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

function cargarConsumicion(req, res) {
    console.log("entre consumicion");
    if (!req.body.frecuencia) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }

    if (!req.body.cantidadConsumicion) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }

    

    //Busco el medicamento y me quedo con la cantidad de comprimidos
    Medicamento.findById(req.params.idMedicamento, function (err, medica) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        
        if (!medica) {
            return res.status(404).json({
                title: 'Error',
                error: 'Medicamento no encontrado'
            });
        }

        console.log("idPaciente: "+req.params.idPaciente);
        Paciente.findById(req.params.idPaciente, function (err, paciente) {
            if (err) {
                return res.status(400).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!paciente) {
                console.log("paciente no encontrado");
                return res.status(404).json({
                    title: 'Error',
                    error: 'Paciente no encontrado'
                });
            }
            
            paciente.medicamentos.push(req.params.idMedicamento);
            
            paciente.consumiciones.push({
                medicamento: req.params.idMedicamento,
                frecuencia: req.body.frecuencia,
                cantidadConsumicion: req.body.cantidadConsumicion,   
                // calculo los dias restantes
                diasRestantes: (medica.cantidadComprimidos/req.body.cantidadConsumicion)/req.body.frecuencia,
                numeroMedicamento: req.params.idMedicamento,
            });
            console.log('el paciente que quiero guardar es: ',paciente);
            paciente.save().then(function (paciente) {
                res.status(200).json({
                    message: 'Success',
                    obj: paciente
                });
            }, function (err) {
                return res.status(404).json({
                    title: 'Error',
                    error: err
                });
            });
            /*paciente.save().then(function (paciente) {
                res.status(200).json({
                    message: 'Success',
                    obj: paciente
                });
            }, function (err) {
                console.log('error al guardar el paciente.');
                return res.status(404).json({
                    
                    title: 'Error',
                    error: err
                });
            });*/            
        });        
    });
    
    
}

function quitarConsumicion(req, res) {

    Paciente.findById(req.params.idPaciente, function (err, paciente) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!paciente) {
            return res.status(404).json({
                title: 'Error',
                error: 'Paciente no encontrado'
            });
        }
        let pos;
        for (let index = 0; index < paciente.medicamentos.length; index++) {
            const medicamento = paciente.medicamentos[index];
            if (medicamento._id == req.params.idMedicamento) {
                pos = index;
            }
        }
        paciente.medicamentos.splice(pos, 1);
        //no carga el medicamento en la consumicion, por eso no lo recupera.. como posee el mismo indice en los 2 arreglos busco una sola vez
        paciente.consumiciones.splice(pos, 1);

        /*let pos2;
        console.log("consumiciones del paciente "+ paciente.consumiciones);
        //console.log("id del primer medicameneto que consume "+paciente.consumicione[0].medicamento._id);
        for (let index = 0; index < paciente.consumiciones.length; index++) {
            const consumicion = paciente.consumiciones[index];
            console.log("la consumicion que quiero verificar "+consumicion);
            console.log("el id del medicamento que quiero eliminar "+req.params.idMedicamento);
            console.log("prueba de id medicamento de la consumicion "+ consumicion.medicamento._id);
            if (consumicion.medicamento._id == req.params.idMedicamento) {
                pos2 = index;
            }
        }
        paciente.consumiciones.splice(pos2, 1);*/

        paciente.save().then(function (paciente) {
            res.status(200).json({
                message: 'Success',
                obj: paciente
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
    
    
}




//Cargar un Medico

function cargarMedico(req, res) {
    console.log("entre cargar medico");
    
    //Asocio el medico al paciente
    Paciente.findById(req.params.idPaciente, function (err, paciente) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!paciente) {
            return res.status(404).json({
                title: 'Error',
                error: 'Paciente no encontrado'
            });
        }

        console.log("medicos: "+req.params.idMedico);
        paciente.medicos.push(req.params.idMedico);

        

        paciente.save().then(function (paciente) {
            res.status(200).json({
                message: 'Success',
                obj: paciente
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });

    //Asocio el paciente al Medico

  
    Medico.findById(req.params.idMedico, function (err, medico) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!medico) {
            return res.status(404).json({
                title: 'Error',
                error: 'Medico no encontrado'
            });
        }
        medico.pacientes.push(req.params.idPaciente );
       

        

        medico.save().then(function (medico) {
            res.status(200).json({
                message: 'Success',
                obj: medico
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}





//Cargar una obra social
function cargarObra(req, res) {
    console.log("entre cargar medico");
    
    //Asocio la obra social al paciente
    Paciente.findById(req.params.idPaciente, function (err, paciente) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!paciente) {
            return res.status(404).json({
                title: 'Error',
                error: 'Paciente no encontrado'
            });
        }

        console.log("obras: "+req.params.idObra);
        paciente.obras.push(req.params.idObra);

        

        paciente.save().then(function (paciente) {
            res.status(200).json({
                message: 'Success',
                obj: paciente
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });

    //Asocio el paciente a la Obra Social

    console.log("salida 3");
    Obra.findById(req.params.idObra, function (err, obra) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!obra) {
            return res.status(404).json({
                title: 'Error',
                error: 'Medico no encontrado'
            });
        }
        obra.pacientes.push(req.params.idPaciente );
       

        

        obra.save().then(function (obra) {
            res.status(200).json({
                message: 'Success',
                obj: obra
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}


// EXPORT
module.exports = {
    getPacientes,
    getPacientePedido,
    getPacienteID,
    cargarPaciente,
    editarPaciente,
    eliminarPaciente,
    cargarConsumicion,
    cargarMedico,
    cargarObra,
    quitarConsumicion
  
  
}

