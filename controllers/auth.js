'use strict'
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 12;
var Usuario = require('../models/user')
var Email = require('../util/email')
var usuarioRegistrado = null

// bcrypt.hash(pass, saltRounds, function (err, hash) {
// Store hash in your password DB.
// example output, taking your hash
// hash = $2a$10$fKAyjaG0pCkisZfRpKsBxursD6QigXQpm1TaPBDZ4KhIZRguYPKHe
// console.log("hash ---<< ", hash)
// });

var controller = {
    login: (req, res) => {
        let user = req.body.user
        let pass = req.body.password
        Usuario.getUserByEmail(user).then(respuesta => {
            if (respuesta != null) {
                usuarioRegistrado = respuesta
                //consultar password 
                Usuario.getPasswordById(respuesta.usua_id).then(password => {
                    if (password != null) {
                        let hash = password.aute_password
                        bcrypt.compare(pass, hash, function (err, result) {
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
                // let datos = {
                //     para: usuario.correo,
                //     asunto: 'nose'
                // }

                // Email.send(datos).then(envio => {
                //     console.log("se hizo el envio?")
                // })
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
    }

}

module.exports = controller