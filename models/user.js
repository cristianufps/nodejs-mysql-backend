
'use strict';

const db = require('../config/bd')
exports.getUsers = async (campos, fn) => {
    try {
        const con = await db.getConnection();
        const rows = await con.query('SELECT * FROM usuario');
        if (!rows) {
            return [];
        }
        return rows;
    }
    catch (e) {
        throw e;
    }
}

exports.getUserById = async (campos, fn) => {

    try {
        const con = await db.getConnection();
        const rows = await con.query('SELECT * FROM usuario WHERE usua_id = ? limit 1', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows[0];
    }
    catch (e) {
        throw e;
    }
}

exports.getUserByEmail = async (campos, fn) => {

    try {
        const con = await db.getConnection();
        const rows = await con.query('SELECT * FROM usuario WHERE usua_correo = ? limit 1', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows[0];
    }
    catch (e) {
        throw e;
    }
}

