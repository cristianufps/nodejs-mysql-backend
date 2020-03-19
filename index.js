'use strict'


var mysql = require('promise-mysql');
var app = require('./app');




var mysqlConnection = {
    host: 'localhost',
    user: 'admin',
    password: '',
    database: '',
    connectionLimit: 10
};

module.exports = async () => {
    try {
        let pool;
        let con;
        if (pool) con = pool.getConnection();
        else {
            pool = await mysql.createPool(dbConfig);
            con = pool.getConnection();
        }
        return con;
    } catch (ex) {
        throw ex;
    }
};