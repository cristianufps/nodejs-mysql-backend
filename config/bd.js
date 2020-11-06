'use strict';

var mysql = require('promise-mysql');
//development-production
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

exports.getConnection = () => {
    return mysql.createConnection({
        // socketPath: config.socketpatch,
        host: config.host,
        user: config.username,
        password: config.password,
        database: config.database
    })
}

exports.endConnection = () => {
    return mysql.end(function(err) {
        // The connection is terminated now
        console.log("Se cierra conexion")
    });
}