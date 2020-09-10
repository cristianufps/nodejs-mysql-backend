'use strict'

//cargar modulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');
// Ejecutar express(http)
var app = express();

//cargar ficheros rutas
var auth_route = require('./routes/auth')
var users_routes = require('./routes/user')
var category_routes = require('./routes/category_routes')
var type_agreement_routes = require('./routes/type_agreement_routes')
var legal_representant_routes = require('./routes/legal_representant_routes')
var company_routes = require('./routes/company_routes')
var agreement_routes = require('./routes/agreement_routes')
var util_routes = require('./routes/util_routes')


//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Añadir prefijos a rutas

app.use('/', users_routes, auth_route, category_routes, type_agreement_routes, legal_representant_routes, company_routes, agreement_routes, util_routes)

module.exports = app;