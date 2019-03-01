'use strict'

var Farmacia = require('../models/farmacia');


// FUNCIONES
function getFarmacias(req, res){
    console.log('- GET FARMACIAS -');
    Farmacia.find({}, function (err, farmacias) {
        if (err) {
            return res.status(400).json({
                title: 'Error',
                error: err
            });
        }
        if (!farmacias) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: farmacias
        });
    });
}

function cargarFarmacia(req, res) {
    console.log('CARGAR FARMACIA');

    if (!req.body.cuitFarmacia) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.nombreFarmacia) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.direccionFarmacia) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.telefonoFarmacia) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    if (!req.body.emailFarmacia) {
        return res.status(400).json({
            title: 'Error',
            error: err
        });
    }
    
    
  
    var nuevoFarmacia = new Farmacia({
        cuit: req.body.cuitFarmacia,
        nombre: req.body.nombreFarmacia,        
        telefono: req.body.telefonoFarmacia,
        direccion: req.body.direccionFarmacia,
        email: req.body.emailFarmacia      
    })

    console.log(nuevoFarmacia);

    nuevoFarmacia.save().then(function (nuevoFarmacia) {
        res.status(201).json({
            message: 'Farmacia creado',
            obj: nuevoFarmacia
        });

    }, function (err) {
        if (err.code == 11000) {
            var msj = ""
            //Catching index name inside errmsg reported by mongo to determine the correct error and showing propper message
            if (err.errmsg.toString().includes("cuit"))
                msj = "cuit Farmacia";
           
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

function editarFarmacia(req, res) {
    console.log('EDITAR FARMACIA');
    Farmacia.findById(req.params.idFarmacia, function (err, farmacia) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!farmacia) {
            return res.status(404).json({
                title: 'Error',
                error: 'Farmacia no encontrado'
            });
        }

        farmacia.nombre = req.body.nombreFarmacia;        
        farmacia.telefono = req.body.telefonoFarmacia;
        farmacia.direccion = req.body.direccionFarmacia;
        farmacia.email = req.body.emailFarmacia;        

        farmacia.save().then(function (farmacia) {
            res.status(200).json({
                message: 'Success',
                obj: farmacia
            });
        }, function (err) {
            return res.status(404).json({
                title: 'Error',
                error: err
            });
        });
    });
}

function eliminarFarmacia(req, res){

    console.log('ELIMINAR farmacia');
        
    console.log(req.params.idFarmacia);


    Farmacia.findOne({'_id': req.params.idFarmacia})
    .exec(function (err, farmacia) {
        if (farmacia) {
            farmacia.remove().then(function (farmaciaEliminado) {
                return res.status(200).json({
                    message: 'farmacia eliminado correctamente',
                    obj: farmaciaEliminado
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

//Cargar un Medicamento

function cargarMedicamento(req, res) {
    console.log("entre cargar medicamento");
    
    //Asocio el medico al paciente
    Farmacia.findById(req.params.idFarmacia, function (err, farmacia) {
        if (err) {
            return res.status(400).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!farmacia) {
            return res.status(404).json({
                title: 'Error',
                error: 'Farmacia no encontrado'
            });
        }

        console.log("medicamentos: "+req.params.idMedicamento);
        farmacia.medicamentos.push(req.params.idMedicamento);

        

        farmacia.save().then(function (farmacia) {
            res.status(200).json({
                message: 'Success',
                obj: farmacia
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
    getFarmacias,
    editarFarmacia,
    eliminarFarmacia,
    cargarMedicamento,
    cargarFarmacia
    
}

