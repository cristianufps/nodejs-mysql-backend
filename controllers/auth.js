'use strict'
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 12;
var Usuario = require('../models/user')
var Email = require('../util/email')
    //universidad
const env = process.env.NODE_ENV || 'universidad';
const config = require(__dirname + '/../config/config.json')[env];
// var usuarioRegistrado = null
const db = require('../config/bd')

var controller = {
    login: async(req, res, next) => {
        let con = await db.getConnection();
        let user = req.body.user
        let pass = req.body.password
        let token
        console.log("AUTH >> US ", user)
        console.log("AUTH >> PASS ", pass)

        try {
            console.log("Usuario.getUserByEmail ")
            let userResp = await Usuario.getUserByEmail(con, user);
            if (userResp != null) {
                console.log("userResp != null")
                let password = await Usuario.getPasswordById(con, userResp.usua_id)
                if (password != null) {
                    console.log("password != null")
                    let hash = password.aute_password
                    bcrypt.compare(pass, hash, function(err, result) {
                        if (result) {
                            const payload = {
                                user_id: userResp.usua_id
                            };
                            //recordar hacer password mas seguro
                            token = jwt.sign(payload, 'SecretPassword', {
                                expiresIn: 7200
                            });
                            console.log("res.status(200)")
                            return res.status(200).send({
                                status: 'success',
                                message: 'Se ha logueado',
                                token: token
                            })
                        } else {
                            return res.status(400).send({
                                status: 'error',
                                message: 'No login',
                            })
                        }
                    });
                } else {
                    return res.status(400).send({
                        status: 'error',
                        message: 'No login',
                    })
                }
            } else {
                return res.status(400).send({
                    status: 'error',
                    message: 'No login',
                })
            }

        } catch (error) {
            console.log("--------- catch LOGIN--------", error)
            return res.status(400).send({
                status: 'error',
                message: 'No login',
                error: error
            })
        } finally {
            console.log("--------- FINALLY LOGIN--------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    },

    me: async(req, res, next) => {
        var con = await db.getConnection();
        let token = req.headers['authorization']
        token = token.replace('Bearer ', '')
        let user

        try {
            let decoded = jwt.verify(token, 'SecretPassword');
            console.log("decoded ----->> ", decoded)
            let idUsuario = decoded.user_id
            if (idUsuario != null) {
                user = await Usuario.getUserById(con, idUsuario)
                if (user != null) {
                    return res.status(200).send({
                        status: 'Success',
                        user: user
                    })
                } else {
                    return res.status(404).send({
                        status: 'Error',
                        message: 'Not found user'
                    })
                }

            }
        } catch (error) {
            next(error)
            return res.status(404).send({
                status: 'Error',
                message: 'Not found'
            })
        } finally {
            console.log("--------- FINALLY ME --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    forgot: async(req, res, next) => {
        var con = await db.getConnection();
        let user = req.body.user

        try {
            let response = await Usuario.getUserByEmail(con, user)
            if (response) {
                const payload = {
                    user_id: response.usua_id
                };
                const token = jwt.sign(payload, 'SecretPassword', {
                    expiresIn: 18000
                });

                let datos = {
                    to: user,
                    subject: 'RECUPERAR PASSWORD',
                    mail: 'Ingrese al siguiente link para establecer una contraseña, solo esta disponible por 5 horas ' + config.url + '/forgot/reset/?token=' + token
                }
                Email.send(datos).then(envio => {
                    return res.status(200).send({
                        status: 'Success',
                        message: 'Se ha enviado el correo satisfactoriamente.',
                        token: token
                    })
                }).catch(err => {
                    console.log("ERROR ENVIO -->> ", err)
                    return res.status(200).send({
                        status: 'Success',
                        message: 'Ocurrió un error enviando correo.',
                        token: token
                    })
                })
            }
        } catch (error) {
            next(error)
            return res.status(404).send({
                status: 'Error',
                message: 'Ha ocurrido un error.'
            })
        } finally {
            console.log("--------- FINALLY forgot --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    reset: async(req, res, next) => {
        var con = await db.getConnection();
        let token = req.headers['authorization']
        let newPassword = req.body.password
        token = token.replace('Bearer ', '')
        console.log("Ha llegado > ", token)

        try {
            let decoded = jwt.verify(token, 'SecretPassword');
            let idUsuario = decoded.user_id
            let change = await bcrypt.hash(newPassword, saltRounds)

            if (change) {
                let campos = {
                    usua_id: idUsuario,
                    password: change
                }
                let resp = await Usuario.updatePasswordByUserId(con, campos)
                console.log("updatePasswordByUserId ", resp)
                if (resp != null) {
                    return res.status(200).send({
                        status: 'Success',
                        message: 'Se ha establecido la contraseña con éxito.'
                    })
                } else {
                    return res.status(404).send({
                        status: 'Error',
                        message: 'Not found'
                    })
                }
            } else {
                return res.status(404).send({
                    status: 'Error',
                    message: 'Error hash'
                })
            }
        } catch (err) {
            return res.status(404).send({
                status: 'Error',
                message: 'Expired token'
            })
        } finally {
            console.log("--------- FINALLY RESET --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    },
    validatePassword: async(req, res) => {
        let con = await db.getConnection();
        let actualPassword = req.params.password
        let idUser = req.params.id

        try {
            let pass = await Usuario.getPasswordById(con, idUser)
            if (pass != null) {
                let hash = pass.aute_password
                bcrypt.compare(actualPassword, hash, function(err, result) {
                    if (result) {
                        if (con != null) {
                            con.end().then(e => { con = null })
                        }
                        return res.status(200).send({
                            status: 'success',
                            message: 'La contraseña coincide',
                            response: true
                        })
                    } else {
                        if (con != null) {
                            con.end().then(e => { con = null })
                        }
                        return res.status(200).send({
                            status: 'success',
                            message: 'Password incorrecta',
                            response: false
                        })
                    }
                });
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'No se encontró la contraseña'
            })
        } finally {
            console.log("--------- FINALLY validatePassword --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    updatePass: async(req, res) => {
        let con = await db.getConnection();
        let actualPassword = req.body.actualPassword
        let idUser = req.params.id
        let newPassword = req.body.newPassword
        let campos
        try {
            let pass = await Usuario.getPasswordById(con, idUser)
            if (pass) {
                let hash = pass.aute_password
                let prob = await bcrypt.compare(actualPassword, hash);
                if (prob) {
                    let change = await bcrypt.hash(newPassword, saltRounds)
                    if (change) {
                        campos = {
                            usua_id: idUser,
                            password: change
                        }
                    }
                }
                let us = await Usuario.updatePasswordByUserId(con, campos)
                if (us != null) {
                    return res.status(200).send({
                        status: 'Success',
                        message: 'Se ha establecido la contraseña con éxito.'
                    })
                } else {
                    return res.status(404).send({
                        status: 'Error',
                        message: 'No se ha podido actualizar la contraseña'
                    })
                }
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Not found'
            })
        } finally {
            console.log("--------- FINALLY updatePass --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
}

module.exports = controller