'use strict'
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 12;
var Usuario = require('../models/user')
var Email = require('../util/email')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
var usuarioRegistrado = null

var controller = {
    login: (req, res) => {
        let user = req.body.user
        let pass = req.body.password
        console.log("AUTH >> US ", user)
        console.log("AUTH >> PASS ", pass)
        Usuario.getUserByEmail(user).then(respuesta => {
            if (respuesta != null) {
                usuarioRegistrado = respuesta
                    //consultar password 
                Usuario.getPasswordById(respuesta.usua_id).then(password => {
                    if (password != null) {
                        let hash = password.aute_password
                        bcrypt.compare(pass, hash, function(err, result) {
                            if (result) {
                                const payload = {
                                    user_id: usuarioRegistrado.usua_id
                                };
                                //recordar hacer password mas seguro
                                const token = jwt.sign(payload, 'SecretPassword', {
                                    expiresIn: 3600
                                });
                                return res.status(200).send({
                                    status: 'success',
                                    message: 'Se ha logueado',
                                    token: token
                                })
                            } else {
                                return res.status(401).send({
                                    status: 'success',
                                    message: 'Password incorrecta'
                                })
                            }

                        });
                    }
                }).catch(error => {
                    return res.status(401).send({
                        status: 'Error',
                        message: 'No se encontró la contraseña'
                    })
                })
            } else {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se encontro el usuario'
                })
            }
        }).catch(error => {
            console.log("Error -->>>>>>>>>> ", error)
            return res.status(404).send({
                status: 'Error',
                message: 'No login'
            })
        })
    },

    me: (req, res) => {
        let token = req.headers['authorization']
        token = token.replace('Bearer ', '')
        let decoded = jwt.verify(token, 'SecretPassword');
        let idUsuario = decoded.user_id
        if (idUsuario != null) {
            Usuario.getUserById(idUsuario).then(usuario => {
                if (usuario != null) {
                    return res.status(200).send({
                        status: 'Success',
                        user: usuario
                    })
                } else {
                    return res.status(404).send({
                        status: 'Error',
                        message: 'Not found'
                    })
                }
            }).catch(err => {
                return res.status(404).send({
                    status: 'Error',
                    message: 'Not found'
                })
            })
        }
    },
    forgot: (req, res) => {
        console.log("FORGOT >> US ", user)
        let user = req.body.user
        Usuario.getUserByEmail(user).then(respuesta => {
            if (respuesta != null) {
                const payload = {
                    user_id: respuesta.usua_id
                };
                const token = jwt.sign(payload, 'SecretPassword', {
                    expiresIn: 10000
                });

                let datos = {
                    to: user,
                    subject: 'RECUPERAR PASSWORD',
                    mail: config.url + '/forgot/reset/?token=' + token
                }

                Email.send(datos).then(envio => {
                    return res.status(200).send({
                        status: 'Success',
                        message: 'Se ha enviado el correo satisfactoriamente.',
                        token: token
                    })
                }).catch(err => {
                    return res.status(200).send({
                        status: 'Success',
                        message: 'Ocurrió un error enviando correo.',
                        token: token
                    })
                })
            } else {
                return res.status(200).send({
                    status: 'Success',
                    message: 'No se encontro el usuario.'
                })
            }
        }).catch(error => {
            return res.status(404).send({
                status: 'Error',
                message: 'Ha ocurrido un error.'
            })
        })
    },
    reset: (req, res) => {
        let token = req.headers['authorization']
        let newPassword = req.body.password
        token = token.replace('Bearer ', '')
        console.log("Ha llegado > ", token)

        try {
            let decoded = jwt.verify(token, 'SecretPassword');
            let idUsuario = decoded.user_id
            bcrypt.hash(newPassword, saltRounds, function(err, hash) {
                let campos = {
                    usua_id: idUsuario,
                    password: hash
                }
                Usuario.updatePasswordByUserId(campos).then(usuario => {
                    console.log("updatePasswordByUserId ", usuario)
                    if (usuario != null) {
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
                }).catch(err => {
                    return res.status(404).send({
                        status: 'Error',
                        message: 'Not found'
                    })
                })

            });
        } catch (err) {
            return res.status(200).send({
                status: 'Error',
                message: 'Expired token'
            })
        }

    },

}

module.exports = controller