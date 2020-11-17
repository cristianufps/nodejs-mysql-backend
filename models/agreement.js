'use strict';

const db = require('../config/bd')
exports.updateAgreement = async(con, campos) => {

    try {
        con = await db.getConnection();
        let query = 'UPDATE convenio SET conv_nombre = ?, conv_descripcion = ?, cate_id = ?, conv_fechainicial = ?, ' +
            'conv_fechafinal = ?, conv_costo = ?  WHERE conv_id = ? '
        const rows = await con.query(query, [
            campos.conv_nombre,
            campos.conv_descripcion,
            campos.cate_id,
            campos.conv_fechainicial,
            campos.conv_fechafinal,
            campos.conv_costo,
            campos.conv_id
        ]);

        if (!rows) {
            throw new Error('No hubo cambios');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.insertAgreement = async(con, campos) => {

    try {
        con = await db.getConnection();
        let query = 'INSERT INTO convenio (conv_nombre,conv_descripcion,tico_id,cate_id,empr_id,conv_padre,conv_fechainicial,conv_fechafinal,conv_costo) ' +
            'VALUES(?,?,?,?,?,?,?,?,?)'
        const rows = await con.query(query, [
            campos.conv_nombre,
            campos.conv_descripcion,
            campos.tico_id,
            campos.cate_id,
            campos.empr_id,
            campos.conv_padre,
            campos.conv_fechainicial,
            campos.conv_fechafinal,
            campos.conv_costo
        ]);
        if (!rows) {
            throw new Error('No hubo registro');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getAgreements = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM convenio c ' +
            'INNER JOIN tipo_convenio t ON  c.tico_id = t.tico_id ' +
            'INNER JOIN empresa e ON e.empr_id = c.empr_id ');
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}


exports.getAgreementById = async(con, campos) => {

    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM convenio WHERE conv_id = ? limit 1', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows[0];
    } catch (e) {
        throw e;
    }
}

exports.getAgreementsParents = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM convenio c ' +
            'INNER JOIN tipo_convenio t ON  c.tico_id = t.tico_id ' +
            'INNER JOIN empresa e ON e.empr_id = c.empr_id ' +
            'WHERE c.tico_id = 1 ');
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.uploadDocument = async(con, campos) => {

    try {
        con = await db.getConnection();
        let query = 'UPDATE convenio SET conv_soporte = ?  WHERE conv_id = ? '
        const rows = await con.query(query, [
            campos.conv_soporte,
            campos.conv_id
        ]);

        if (!rows) {
            throw new Error('No hubo cambios');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getAgreementsAboutToExpire = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM convenio WHERE YEAR(conv_fechafinal) = YEAR(CURRENT_DATE()) ' +
            'AND MONTH(conv_fechafinal)  = MONTH(CURRENT_DATE()) ');
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getAgreementsSpecific = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT c.conv_id,c.conv_nombre,emp.empr_nombre, c.conv_fechafinal,' +
            'IFNULL(padre.conv_nombre,"NO APLICA") AS padre_nombre ' +
            'FROM convenio c ' +
            'INNER JOIN empresa emp  ON emp.empr_id = c.empr_id ' +
            'LEFT JOIN convenio padre ON padre.conv_id = c.conv_padre ' +
            'WHERE c.tico_id = 2');
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getAgreementsExcel = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT c.conv_nombre AS nombre, c.conv_fechainicial AS inicio, c.conv_fechafinal AS fin, ' +
            'ca.cate_nombre AS categorias ,t.tico_nombre AS tipo, e.empr_nombre AS organizacion, ' +
            'IFNULL(padre.conv_nombre,"NO APLICA") AS padre_nombre ' +
            'FROM convenio c ' +
            'INNER JOIN tipo_convenio t ON  c.tico_id = t.tico_id ' +
            'INNER JOIN categoria ca ON ca.cate_id = c.cate_id ' +
            'INNER JOIN empresa e ON e.empr_id = c.empr_id ' +
            'LEFT JOIN convenio padre ON padre.conv_id = c.conv_padre ');
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.deleteAgreementById = async(con, campos) => {
    try {
        con = await db.getConnection();
        const rows = await con.query('DELETE FROM convenio WHERE conv_id = ?', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}


exports.getAgremmentsByParentId = async(con, campos) => {

    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM convenio WHERE conv_padre = ? ', [campos]);
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getStudentsByAgremment = async(con, campos) => {

    try {
        con = await db.getConnection();
        const rows = await con.query('SELECT * FROM estudiante WHERE conv_id = ? ', [campos]);
        if (!rows) {
            return [];
        }
        console.log("cccc ", rows);
        return rows;
    } catch (e) {
        throw e;
    }
}