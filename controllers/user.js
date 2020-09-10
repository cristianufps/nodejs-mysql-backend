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

    update_user: (req, res) => {
        let user = req.body.user
        Usuario.updateProfile(user).then(respuesta => {
            return res.status(200).send({
                status: 'success',
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error editando el perfil.'
            })
        })
    },

    uploadImage: (req, res, next) => {
        // Was an image uploaded? If so, we'll use its public URL
        // in cloud storage.
        if (req.file && req.file.cloudStoragePublicUrl) {
            let imageUrl = req.file.cloudStoragePublicUrl;
            let name = req.file.cloudStorageObject

            name = name.split("/")[1]

            let user = {
                usua_id: req.params.id,
                usua_imgperfil: name
            }
            Usuario.updateImageProfile(user).then(respuesta => {
                return res.status(200).send({
                    status: 'success',
                    message: 'Se ha cargado la imagen con éxito',
                    url: name
                })
            }).catch(err => {
                return res.status(404).send({
                    status: 'Error',
                    message: 'Se ha producido un error editando el usuario.'
                })
            })
        } else {
            return res.status(404).send({
                status: "Error",
                message: 'Ha ocurrido un error subiendo la imagen'
            })
        }
    }
}

module.exports = controller