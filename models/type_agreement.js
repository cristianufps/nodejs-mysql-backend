'use strict';

const db = require('../config/bd')
exports.updateTypeAgreement = async(con, campos) => {

    try {
        con = await db.getConnection();
        let query = 'UPDATE tipo_convenio SET tico_nombre = ? WHERE tico_id = ? '
        const rows = await con.query(query, [campos.tico_nombre, campos.tico_id]);
        if (!rows) {
            throw new Error('No hubo cambios');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.insertTypeAgreement = async(con, campos) => {

    try {
        con = await db.getConnection();
        let query = 'INSERT INTO tipo_convenio (tico_nombre) VALUES(?)'
        const rows = await con.query(query, [campos.tico_nombre]);
        if (!rows) {
            throw new Error('No hubo registro');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getTypesAgreements = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM tipo_convenio');
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}


exports.getTypeAgreementById = async(con, campos) => {

    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM tipo_convenio WHERE tico_id = ? limit 1', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows[0];
    } catch (e) {
        throw e;
    }
}