'use strict';

const db = require('../config/bd')
exports.updateCategory = async(campos, fn) => {

    try {
        const con = await db.getConnection();
        let query = 'UPDATE categoria SET cate_nombre = ? WHERE cate_id = ? '
        const rows = await con.query(query, [campos.cate_nombre, campos.cate_id]);
        if (!rows) {
            throw new Error('No hubo cambios');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.insertCategory = async(campos, fn) => {

    try {
        const con = await db.getConnection();
        let query = 'INSERT INTO categoria (cate_nombre) VALUES(?)'
        const rows = await con.query(query, [campos.cate_nombre]);
        if (!rows) {
            throw new Error('No hubo registro');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getCategories = async(campos, fn) => {
    try {
        const con = await db.getConnection();
        const rows = await con.query('SELECT * FROM categoria');
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}


exports.getCategoryById = async(campos, fn) => {

    try {
        const con = await db.getConnection();
        const rows = await con.query('SELECT * FROM categoria WHERE cate_id = ? limit 1', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows[0];
    } catch (e) {
        throw e;
    }
}