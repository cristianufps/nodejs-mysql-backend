'use strict';

var mysql = require('promise-mysql');
const env = process.env.NODE_ENV || 'production';
const config = require(__dirname + '/../config/config.json')[env];

exports.getConnection = () => {
    return mysql.createConnection({
        host: config.host,
        user: config.username,
        password: config.password,
        database: config.database
    })
}