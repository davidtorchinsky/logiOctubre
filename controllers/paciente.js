'use strict'

var Pacinete = require('../models/paciente');

// FUNCIONES
function getPacinetes(req, res){
    console.log('- GET PACIENTES -')
    Pacinete.find({}, function (err, pacientes) {
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

function cargarPacinete(req, res) {
    console.log('CARGAR PACIENTE')
    if (!req.body.dniPacinete) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.nombrePacinete) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.apellidoPacinete) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.telefonoPacinete) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.direccionPacinete) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.fechaNacimientoPacinete) {
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

    var nuevoPacinete = new Pacinete({
        dni: req.body.dniPacinete,
        nombre: req.body.nombrePacinete,
        apellido: req.body.apellidoPacinete,
        telefono: req.body.telefonoPacinete,
        direccion: req.body.direccionPacinete,
        fechaNacimiento: req.body.fechaNacimientoPacinete,
        barrio: req.body.barrioPaciente
    })
    console.log(nuevoPacinete);

    nuevoPacinete.save().then(function (nuevoPacinete) {
        res.status(201).json({
            message: 'Pacinete creado',
            obj: nuevoPacinete
        });

    }, function (err) {
        if (err.code == 11000) {
            var msj = ""
            //Catching index name inside errmsg reported by mongo to determine the correct error and showing propper message
            if (err.errmsg.toString().includes("dni"))
                msj = "Dni de Pacinete";
           
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

function editarPacinete(req, res) {
    console.log('EDITAR PACIENTE');
    console.log(req.params.idPacinete);
    Pacinete.findById(req.params.idPacinete, function (err, paciente) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!paciente) {
            return res.status(404).json({
                title: 'Error',
                error: 'Pacinete no encontrado'
            });
        }

        paciente.nombre = req.body.nombrePacinete;
        paciente.apellido = req.body.apellidoPacinete;
        paciente.telefono = req.body.telefonoPacinete;
        paciente.direccion = req.body.direccionPacinete;
        paciente.fechaNacimiento = req.body.fechaNacimientoPacinete;
        paciente.barrio = req.body.barrioPaciente;

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

function eliminarPacinete(req, res){
    console.log('ELIMINAR PACIENTE')
    
    Pacinete.findOne({'_id': req.params.idPacinete})
    .exec(function (err, paciente) {
        if (paciente) {
            paciente.remove().then(function (pacienteEliminado) {
                return res.status(200).json({
                    message: 'Pacinete eliminado correctamente',
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
    getPacinetes,
    cargarPacinete,
    editarPacinete,
    eliminarPacinete
}

