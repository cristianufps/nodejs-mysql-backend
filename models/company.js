'use strict';

const db = require('../config/bd')
exports.updateCompany = async(campos, fn) => {

    try {
        const con = await db.getConnection();
        let query = 'UPDATE empresa SET empr_nombre = ?, empr_nit = ?, empr_direccion = ?, ' +
            'empr_telefono = ?  WHERE empr_id = ? '
        const rows = await con.query(query, [
            campos.empr_nombre,
            campos.empr_nit,
            campos.empr_direccion,
            campos.empr_telefono,
            campos.empr_id
        ]);

        if (!rows) {
            throw new Error('No hubo cambios');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.insertCompany = async(campos, fn) => {

    try {
        const con = await db.getConnection();
        let query = 'INSERT INTO empresa (empr_nombre,empr_nit,empr_direccion,empr_telefono,rele_id) ' +
            'VALUES(?,?,?,?,?)'
        const rows = await con.query(query, [
            campos.empr_nombre,
            campos.empr_nit,
            campos.empr_direccion,
            campos.empr_telefono,
            campos.rele_id
        ]);
        if (!rows) {
            throw new Error('No hubo registro');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getCompanies = async(campos, fn) => {
    try {
        const con = await db.getConnection();
        const rows = await con.query('SELECT * FROM empresa');
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}


exports.getCompanyById = async(campos, fn) => {

    try {
        const con = await db.getConnection();
        const rows = await con.query('SELECT * FROM empresa WHERE empr_id = ? limit 1', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows[0];
    } catch (e) {
        throw e;
    }
}