'use strict'

var Medico = require('../models/medico');

// FUNCIONES
function getMedicos(req, res){
    console.log('- GET MEDICOS -')
    Medico.find({}, function (err, medicos) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!medicos) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: medicos
        });
    });
}

function cargarMedico(req, res) {
    console.log('CARGAR MEDICO')
    if (!req.body.dniMedico) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.nombreMedico) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.apellidoMedico) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.telefonoMedico) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.matriculaMedico) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }

    var nuevoMedico = new Medico({
        dni: req.body.dniMedico,
        nombre: req.body.nombreMedico,
        apellido: req.body.apellidoMedico,
        telefono: req.body.telefonoMedico,
        matricula: req.body.matriculaMedico
    })
    console.log(nuevoMedico);

    nuevoMedico.save().then(function (nuevoMedico) {
        res.status(201).json({
            message: 'Medico creado',
            obj: nuevoMedico
        });

    }, function (err) {
        if (err.code == 11000) {
            var msj = ""
            //Catching index name inside errmsg reported by mongo to determine the correct error and showing propper message
            if (err.errmsg.toString().includes("dni"))
                msj = "Dni de Medico";
           
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

function editarMedico(req, res) {
    console.log('EDITAR MEDICO');
    console.log(req.params.idMedico);
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

        medico.nombre = req.body.nombreMedico;
        medico.apellido = req.body.apellidoMedico;
        medico.telefono = req.body.telefonoMedico;
        medico.matricula = req.body.matriculaMedico;

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

function eliminarMedico(req, res){
    console.log('ELIMINAR MEDICO')
    
    Medico.findOne({'_id': req.params.idMedico})
    .exec(function (err, medico) {
        if (medico) {
            medico.remove().then(function (medicoEliminado) {
                return res.status(200).json({
                    message: 'Medico eliminado correctamente',
                    obj: medicoEliminado
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
    getMedicos,
    cargarMedico,
    editarMedico,
    eliminarMedico
}

