'use strict';

var mysql = require('promise-mysql');
//development-production-universidad
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