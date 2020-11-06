'use strict';

const db = require('../config/bd')
exports.updateAlert = async(con, campos) => {
    try {
        con = await db.getConnection();
        let query = 'UPDATE alerta SET tial_id = ?, soli_id = ?' +
            ' WHERE aler_id = ?'
        const rows = await con.query(query, [
            campos.tial_id,
            campos.soli_id,
            campos.aler_id
        ]);
        if (!rows) {
            throw new Error('No hubo cambios');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.markSeenAlert = async(con, campos) => {
    try {
        con = await db.getConnection();
        let query = 'UPDATE alerta SET aler_visto = 1' +
            ' WHERE aler_id = ?'
        const rows = await con.query(query, [
            campos.aler_id
        ]);
        if (!rows) {
            throw new Error('No hubo cambios');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.insertAlert = async(con, campos) => {
    try {
        con = await db.getConnection();
        let query = 'INSERT INTO alerta (tial_id,soli_id) ' +
            'VALUES(?,?)'
        const rows = await con.query(query, [
            campos.tial_id,
            campos.soli_id
        ]);
        if (!rows) {
            throw new Error('No hubo registro');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getAlerts = async(con, campos) => {
    try {
        con = await db.getConnection();
        let query = " SELECT * FROM alerta " +
            "INNER JOIN tipo_alerta tiap ON alerta.tial_id = tiap.tial_id " +
            "INNER JOIN solicitud sol ON alerta.soli_id = sol.soli_id "
        const rows = await con.query(query);
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getAlertsNotView = async(con, campos) => {
    try {
        con = await db.getConnection();
        let query = " SELECT * FROM alerta " +
            "INNER JOIN tipo_alerta tiap ON alerta.tial_id = tiap.tial_id " +
            "INNER JOIN solicitud sol ON alerta.soli_id = sol.soli_id " +
            "WHERE alerta.aler_visto = 0 "
        const rows = await con.query(query);
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}


exports.getAlertById = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM alerta WHERE aler_id = ? limit 1', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows[0];
    } catch (e) {
        throw e;
    }
}

exports.deleteAlertByRequestId = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('DELETE FROM alerta WHERE soli_id = ?', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        console.log("ROWS --->> ", rows)
        return rows;
    } catch (e) {
        throw e;
    }
}