'use strict';

exports.getUsers = async(con, campos) => {
    try {
        const rows = await con.query('SELECT * FROM usuario');
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getUserById = async(con, campos) => {
    try {
        const rows = await con.query('SELECT * FROM usuario WHERE usua_id = ? limit 1', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows[0];
    } catch (e) {
        throw e;
    }
}

exports.getUserByEmail = async(con, campos) => {

    try {
        const rows = await con.query('SELECT * FROM usuario WHERE usua_correo = ? limit 1', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows[0];
    } catch (e) {
        throw e;
    }
}

exports.getPasswordById = async(con, campos) => {
    try {
        const rows = await con.query('SELECT * FROM autenticacion WHERE usua_id = ? limit 1', [campos]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows[0];
    } catch (e) {
        throw e;
    }
}


exports.updatePasswordByUserId = async(con, campos) => {

    try {
        let query = 'UPDATE autenticacion SET aute_password = ? WHERE usua_id = ? '
        const rows = await con.query(query, [campos.password, campos.usua_id]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}


exports.updateProfile = async(con, campos) => {

    try {
        let query = 'UPDATE usuario SET usua_nombres = ?, usua_apellidos = ?, usua_documento = ?, ' +
            'usua_celular = ?, usua_direccion = ?, usua_correo = ?  WHERE usua_id = ? '
        const rows = await con.query(query, [campos.usua_nombres, campos.usua_apellidos, campos.usua_documento, campos.usua_celular, campos.usua_direccion, campos.usua_correo, campos.usua_id]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.updateImageProfile = async(con, campos) => {

    try {
        let query = 'UPDATE usuario SET usua_imgperfil = ? WHERE usua_id = ? '
        const rows = await con.query(query, [campos.usua_imgperfil, campos.usua_id]);
        if (!rows) {
            throw new Error('no existe');
        }
        return rows;
    } catch (e) {
        throw e;
    }
}

exports.getEmailUsersAdmin = async(con, campos) => {
    try {
        const rows = await con.query('SELECT usua_correo FROM usuario WHERE tius_id = 1');
        if (!rows) {
            return [];
        }
        return rows;
    } catch (e) {
        throw e;
    }
}