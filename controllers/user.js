'use strict'

var Usuario = require('../models/user')
const db = require('../config/bd')

var controller = {
    edinson: (req, res) => {
        return res.status(200).send({
            status: 'success',
            message: 'Esto si funciona es porque hay problema en la bd'
        })
    },

    usuarios: async(req, res) => {
        var con = await db.getConnection();
        let users
        try {
            users = await Usuario.getUsers(con, req.body);
            if (users) {
                return res.status(200).send({
                    status: 'success',
                    usuario: users
                })
            } else {
                return res.status(202).send({
                    status: 'success',
                    message: 'Not foun users'
                })
            }
        } catch (err) {
            return res.status(400).send({
                status: 'error',
                error: err
            })
        } finally {
            console.log("--------- FINALLY usuarios--------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    },

    user_by_id: async(req, res) => {
        var con = await db.getConnection();
        let idUser = req.params.id
        let user

        try {
            user = await Usuario.getUserById(con, idUser);
            if (user) {
                return res.status(200).send({
                    status: 'success',
                    usuario: user
                })
            } else {
                return res.status(202).send({
                    status: 'success',
                    message: 'Not found user'
                })
            }

        } catch (err) {
            return res.status(400).send({
                status: 'error',
                error: err
            })
        } finally {
            console.log("--------- FINALLY user_by_id--------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    },

    update_user: async(req, res) => {
        var con = await db.getConnection();
        let user = req.body.user
        let resp
        try {
            resp = await Usuario.updateProfile(con, user);
            if (resp) {
                return res.status(200).send({
                    status: 'success',
                })
            }
        } catch (err) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error editando el perfil.',
                error: err
            })
        } finally {
            console.log("--------- FINALLY update_user--------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    },

    uploadImage: async(req, res, next) => {
        var con = await db.getConnection();
        let name, resp
        try {
            // Was an image uploaded? If so, we'll use its public URL
            // in cloud storage.
            if (req.file && req.file.cloudStoragePublicUrl) {
                let imageUrl = req.file.cloudStoragePublicUrl;
                name = req.file.cloudStorageObject
                name = name.split("/")[1]
                let user = {
                    usua_id: req.params.id,
                    usua_imgperfil: name
                }
                resp = await Usuario.updateImageProfile(con, user);
                if (resp) {
                    return res.status(200).send({
                        status: 'success',
                        message: 'Se ha cargado la imagen con éxito',
                        url: name
                    })
                }

            } else {
                return res.status(404).send({
                    status: "Error",
                    message: 'Ha ocurrido un error subiendo la imagen'
                })
            }
        } catch (err) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error editando el usuario.',
                error: err
            })
        } finally {
            console.log("--------- FINALLY uploadImage--------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    }
}

module.exports = controller