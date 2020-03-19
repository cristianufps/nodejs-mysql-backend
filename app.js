'use strict'

//cargar modulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');

// Ejecutar express(http)
var app = express();

//cargar ficheros rutas


//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


module.exports = app;