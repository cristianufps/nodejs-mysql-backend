'use strict';

const db = require('../config/bd')
exports.updateStudent = async(con, campos) => {

    try {
        con = await db.getConnection();
        let query = 'UPDATE estudiante SET estu_nombres = ?, estu_apellidos = ?, ' +
            ' estu_codigo = ?, conv_id = ?  WHERE estu_id = ?'
        const rows = await con.query(query, [
            campos.estu_nombres,
            campos.estu_apellidos,
            campos.estu_codigo,
            campos.conv_id,
            campos.estu_id
        ]);
        if (!rows) {
            throw new Error('No hubo cambios');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.insertStudent = async(con, campos) => {

    try {
        con = await db.getConnection();
        let query = 'INSERT INTO estudiante (estu_nombres,estu_apellidos,estu_codigo,conv_id) ' +
            ' VALUES(?,?,?,?)'
        const rows = await con.query(query, [
            campos.estu_nombres,
            campos.estu_apellidos,
            campos.estu_codigo,
            campos.conv_id,
            campos.estu_id
        ]);
        if (!rows) {
            throw new Error('No hubo registro');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getStudents = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM estudiante e INNER JOIN convenio c ON c.conv_id = e.conv_id');
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getStudentsExcel = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT estu_codigo AS codigo,estu_nombres AS nombres, estu_apellidos AS apellidos,' +
            ' conv_nombre AS convenio, estu_fecharegistro AS registro' +
            ' FROM estudiante e ' +
            ' INNER JOIN convenio c ON c.conv_id = e.conv_id');
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}


exports.getStudentById = async(con, campos) => {

    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM estudiante WHERE estu_id = ? limit 1', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows[0];
    } catch (e) {
        throw e;
    }
}

exports.getStudentByCode = async(con, campos) => {

    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM estudiante WHERE estu_codigo = ? limit 1', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows[0];
    } catch (e) {
        throw e;
    }
}

exports.validateCodeUpdate = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM estudiante WHERE estu_codigo = ? AND estu_id <> ?', [campos.estu_codigo, campos.estu_id]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows[0];
    } catch (e) {
        throw e;
    }
}

exports.getStudentsByAgreement = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM estudiante e INNER JOIN convenio c ON c.conv_id = e.conv_id WHERE e.conv_id = ?', [campos]);
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getStudentsExcelByAgreement = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT estu_codigo AS codigo,estu_nombres AS nombres, estu_apellidos AS apellidos,' +
            ' conv_nombre AS convenio, estu_fecharegistro AS registro' +
            ' FROM estudiante e ' +
            ' INNER JOIN convenio c ON c.conv_id = e.conv_id' +
            ' WHERE e.conv_id = ?', [campos]);
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}