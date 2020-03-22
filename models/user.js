
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


exports.getUsers = (campos, fn) => {
    return bd.query('SELECT * FROM usuario')
        .then(rows => {
            return Promise.resolve(rows)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

exports.getUserById = (campos, fn) => {
    console.log("esto llega ", campos)
    return bd.query('SELECT * FROM usuario WHERE usua_id = ? ', [campos])
        .then(rows => {
            return Promise.resolve(rows[0])
        })
        .catch(err => {
            return Promise.reject(err)
        })
}