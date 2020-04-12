'use strict'

var Usuario = require('../models/user')

var controller = {

    edinson: (req, res) => {
        console.log("LLEGA AL controller USERS")
        return res.status(200).send({
            status: 'success',
            message: 'Esto si funciona es porque hay problema en la bd'
        })
    },

    usuarios: (req, res) => {
        Usuario.getUsers(req.body).then(respuesta => {
            return res.status(200).send({
                status: 'success',
                usuario: respuesta
            })
        })
    },

    user_by_id: (req, res) => {
        let idUser = req.params.id
        Usuario.getUserById(idUser).then(respuesta => {
            return res.status(200).send({
                status: 'success',
                usuario: respuesta
            })
        }).catch(err => {
            return res.status(200).send({
                status: 'Error',
                message: 'Error en la consulta'
            })
        })
    },

}

module.exports = controller