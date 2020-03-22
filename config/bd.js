'use strict';

var mysql = require('promise-mysql');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

var bd

var pool = mysql.createPool({
    connectionLimit: 113,
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database,
}).then(res => {
    bd = res
});


exports.connect = mysql.createPool({
    connectionLimit: 113,
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database,
}).then(res => {
    bd = res
});



