'use strict'
var jwt = require('jsonwebtoken')
var Usuario = require('../models/user')

var controller = {

    login: (req, res) => {
        let user = req.body.user
        Usuario.getUserByEmail(user).then(respuesta => {
            if (respuesta != null) {
                const payload = {
                    check: true
                };
                //recordar hacer password mas seguro
                const token = jwt.sign(payload, 'SecretPassword', {
                    expiresIn: 3600
                });

                return res.status(200).send(
                    {
                        status: 'success',
                        token: token
                    }
                )
            } else {
                return res.status(404).send(
                    {
                        status: 'Error',
                        message: 'No se encontro el usuario'
                    }
                )
            }

        }).catch(error => {
            return res.status(404).send(
                {
                    status: 'Error',
                    message: 'No login'
                }
            )
        })
    },



}

module.exports = controller