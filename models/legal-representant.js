'use strict';

const db = require('../config/bd')
exports.updateLegalRepresentant = async(con, campos) => {

    try {
        con = await db.getConnection();
        let query = 'UPDATE representante_legal SET rele_nombres = ?, rele_apellidos = ?, rele_documento = ?, ' +
            'rele_celular = ?, rele_correo = ?  WHERE rele_id = ? '
        const rows = await con.query(query, [
            campos.rele_nombres,
            campos.rele_apellidos,
            campos.rele_documento,
            campos.rele_celular,
            campos.rele_correo,
            campos.rele_id
        ]);

        if (!rows) {
            throw new Error('No hubo cambios');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.insertLegalRepresentant = async(con, campos) => {

    try {
        con = await db.getConnection();
        let query = 'INSERT INTO representante_legal (rele_nombres,rele_apellidos,rele_documento,rele_celular,rele_correo) ' +
            'VALUES(?,?,?,?,?)'
        const rows = await con.query(query, [
            campos.rele_nombres,
            campos.rele_apellidos,
            campos.rele_documento,
            campos.rele_celular,
            campos.rele_correo
        ]);
        if (!rows) {
            throw new Error('No hubo registro');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getLegalRepresentants = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM representante_legal');
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}


exports.getLegalRepresentantById = async(con, campos) => {

    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM representante_legal WHERE rele_id = ? limit 1', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows[0];
    } catch (e) {
        throw e;
    }
}