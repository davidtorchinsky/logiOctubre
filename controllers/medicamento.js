'use strict'

var Medicamento = require('../models/medicamento');

// FUNCIONES
function getMedicamentos(req, res){
    console.log('- GET MEDICAMENTOS -');
    Medicamento.find({}, function (err, medicamentos) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!medicamentos) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: medicamentos
        });
    });
}

function cargarMedicamento(req, res) {
    console.log('CARGAR MEDICAMENTO');

    if (!req.body.idMedicamento) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.nombreMedicamento) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.dosisMedicamento) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.cadenaFrioMedicamento) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.cantidadComprimidosMedicamento) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
  
    var nuevoMedicamento = new Medicamento({
        idMedicamento: req.body.idMedicamento,
        nombre: req.body.nombreMedicamento,
        dosis: req.body.dosisMedicamento,
        cadenaFrio: req.body.cadenaFrioMedicamento,
        laboratorio: req.body.laboratorioMedicamento,
        cantidadComprimidos: req.body.cantidadComprimidosMedicamento
      
    })

    console.log(nuevoMedicamento);

    nuevoMedicamento.save().then(function (nuevoMedicamento) {
        res.status(201).json({
            message: 'Medicamento creado',
            obj: nuevoMedicamento
        });

    }, function (err) {
        if (err.code == 11000) {
            var msj = ""
            //Catching index name inside errmsg reported by mongo to determine the correct error and showing propper message
            if (err.errmsg.toString().includes("idMedicam"))
                msj = "Id Medicamento";
           
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

function editarMedicamento(req, res) {
    console.log('EDITAR MEDICAMENTO');
    console.log(req.params.idMedicamento);
    console.log(req.body.idMedicamento);
    Medicamento.findById(req.params.idMedicamentos, function (err, medicamento) {
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

        medicamento.nombre = req.body.nombreMedicamento;
        medicamento.dosis = req.body.dosisMedicamento;
        medicamento.cadenaFrio = req.body.cadenaFrioMedicamento;
        medicamento.laboratorio = req.body.laboratorioMedicamento;
        medicamento.cantidadComprimidos = req.body.cantidadComprimidosMedicamento;

        medicamento.save().then(function (medicamento) {
            res.status(200).json({
                message: 'Success',
                obj: medicamento
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}

function eliminarMedicamento(req, res){

    console.log('ELIMINAR medicamento');
        
    console.log(req.params.idMedicamentos);


    Medicamento.findOne({'_id': req.params.idMedicamentos})
    .exec(function (err, medicamento) {
        if (medicamento) {
            medicamento.remove().then(function (medicamentoEliminado) {
                return res.status(200).json({
                    message: 'medicamento eliminado correctamente',
                    obj: medicamentoEliminado
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
    getMedicamentos,
    cargarMedicamento,
    editarMedicamento,
    eliminarMedicamento
}

