'use strict'

var Obra = require('../models/obras');

// FUNCIONES
function getObras(req, res){
    console.log('- GET OBRAS -')
    Obra.find({}, function (err, obras) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!obras) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: obras
        });
    });
}

function cargarObra(req, res) {
    console.log('CARGAR OBRA')
    if (!req.body.cuitObraSocial) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.nombreObra) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.direccionObra) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.telefonoObra) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.emailObra) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }

    var nuevaObra = new Obra({
        cuit: req.body.cuitObraSocial,
        nombre: req.body.nombreObra,
        direccion: req.body.direccionObra,
        telefono: req.body.telefonoObra,
        email: req.body.emailObra
    })

    nuevaObra.save().then(function (nuevaObra) {
        res.status(201).json({
            message: 'Obra social creada',
            obj: nuevaObra
        });

    }, function (err) {
        if (err.code == 11000) {
            var msj = ""
            //Catching index name inside errmsg reported by mongo to determine the correct error and showing propper message
            if (err.errmsg.toString().includes("cuit"))
                msj = "Cuid Obra Social";
           
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

function editarObra(req, res) {
    console.log('EDITAR OBRA SOCIAL');
    console.log(req.params.idObra);
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
                error: 'Obra Social no encontrada'
            });
        }

        obra.nombre = req.body.nombreObra;
        obra.apellido = req.body.direccionObra;
        obra.telefono = req.body.telefonoObra;
        obra.matricula = req.body.emailObra;

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

function eliminarObra(req, res){
    console.log('ELIMINAR OBRA SOCIAL')
    
    Obra.findOne({'_id': req.params.idObra})
    .exec(function (err, obra) {
        if (obra) {
            obra.remove().then(function (obraEliminada) {
                return res.status(200).json({
                    message: 'Obra Social eliminada correctamente',
                    obj: obraEliminada
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
    getObras,
    cargarObra,
    editarObra,
    eliminarObra
}

