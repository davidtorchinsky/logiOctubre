'use strict'

var Paciente = require('../models/paciente');

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
        dniPaciente: req.body.dniPaciente,
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
            if (err.errmsg.toString().includes("idMedicam"))
                msj = "Id Paciente";
           
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
    console.log(req.params.dniPaciente);
    console.log(req.body.dniPaciente);
    Paciente.findById(req.params.dniPacientes, function (err, paciente) {
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
        
    console.log(req.params.dniPacientes);


    Paciente.findOne({'_id': req.params.dniPacientes})
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

// EXPORT
module.exports = {
    getPacientes,
    cargarPaciente,
    editarPaciente,
    eliminarPaciente
}

