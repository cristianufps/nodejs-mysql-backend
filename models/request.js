'use strict';

const db = require('../config/bd')
exports.updateRequest = async(con, campos) => {
    try {
        con = await db.getConnection();
        let query = 'UPDATE solicitud SET soli_responsable = ?, soli_celular = ? ,soli_correo = ? ' +
            'soli_detalle = ?, soli_estado = ? WHERE soli_id = ?'
        const rows = await con.query(query, [
            campos.soli_responsable,
            campos.soli_celular,
            campos.soli_correo,
            campos.soli_detalle,
            campos.soli_estado,
            campos.soli_id
        ]);
        if (!rows) {
            throw new Error('No hubo cambios');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.changeStateRequest = async(con, campos) => {
    try {
        con = await db.getConnection();
        let query = 'UPDATE solicitud SET soli_estado = ? ' +
            ' WHERE soli_id = ?'
        const rows = await con.query(query, [
            campos.soli_estado,
            campos.soli_id
        ]);
        if (!rows) {
            throw new Error('No hubo cambios');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.insertRequest = async(con, campos) => {
    try {
        con = await db.getConnection();
        let query = 'INSERT INTO solicitud (soli_responsable,soli_celular,soli_correo,soli_detalle) ' +
            'VALUES(?,?,?,?)'
        const rows = await con.query(query, [
            campos.soli_responsable,
            campos.soli_celular,
            campos.soli_correo,
            campos.soli_detalle
        ]);
        if (!rows) {
            throw new Error('No hubo registro');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getRequest = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM solicitud ORDER BY solicitud.soli_fecharegistro desc');
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}


exports.getRequestById = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM solicitud WHERE soli_id = ? limit 1', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows[0];
    } catch (e) {
        throw e;
    }
}

exports.deleteRequestById = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('DELETE FROM solicitud WHERE soli_id = ?', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}