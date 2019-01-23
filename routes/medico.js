'use strict'

var express = require('express');
var api = express.Router();
var MedicoController = require('../controllers/medico');

api.get('/',MedicoController.getMedicos);

module.exports = api;