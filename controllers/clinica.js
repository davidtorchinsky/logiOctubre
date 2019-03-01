'use strict'

var Clinica = require('../models/clinica');
var Medico = require('../models/medico');

// FUNCIONES
function getClinicas(req, res){
    console.log('- GET CLINICAS -');
    Clinica.find({}, function (err, clinicas) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!clinicas) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: clinicas
        });
    });
}

function cargarClinica(req, res) {
    console.log('CARGAR CLINICA');

    if (!req.body.idClinicaClinica) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.nombreClinica) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.emailClinica) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.telefonoClinica) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.direccionClinica) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    
    
  
    var nuevoClinica = new Clinica({
        idClinica: req.body.idClinicaClinica,
        nombre: req.body.nombreClinica,
        email: req.body.emailClinica,
        telefono: req.body.telefonoClinica,
        direccion: req.body.direccionClinica
        
      
    })

    console.log(nuevoClinica);

    nuevoClinica.save().then(function (nuevoClinica) {
        res.status(201).json({
            message: 'Clinica creado',
            obj: nuevoClinica
        });

    }, function (err) {
        if (err.code == 11000) {
            var msj = ""
            //Catching index name inside errmsg reported by mongo to determine the correct error and showing propper message
            if (err.errmsg.toString().includes("idClinica"))
                msj = "idClinica Clinica";
           
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

function editarClinica(req, res) {
    console.log('EDITAR CLINICA');
    console.log(req.params.idClinica);
    console.log(req.body.idClinica);
    Clinica.findById(req.params.idClinica, function (err, clinica) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!clinica) {
            return res.status(404).json({
                title: 'Error',
                error: 'Clinica no encontrado'
            });
        }

        clinica.nombre = req.body.nombreClinica;
        clinica.email = req.body.emailClinica;
        clinica.telefono = req.body.telefonoClinica;
        clinica.direccion = req.body.direccionClinica
        

        clinica.save().then(function (clinica) {
            res.status(200).json({
                message: 'Success',
                obj: clinica
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}

function eliminarClinica(req, res){

    console.log('ELIMINAR clinica');
        
    console.log(req.params.idClinica);


    Clinica.findOne({'_id': req.params.idClinica})
    .exec(function (err, clinica) {
        if (clinica) {
            clinica.remove().then(function (clinicaEliminado) {
                return res.status(200).json({
                    message: 'clinica eliminado correctamente',
                    obj: clinicaEliminado
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
    getClinicas,
    cargarClinica,
    editarClinica,
    eliminarClinica
}