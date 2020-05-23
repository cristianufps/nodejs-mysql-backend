'use strict'

var RepresentanteLegal = require('../models/legal-representant')

var controller = {

    create_legal_representant: (req, res) => {
        let representante = req.body.legal_representant
        RepresentanteLegal.insertLegalRepresentant(representante).then(respuesta => {
            console.log("res insert --- -> ", respuesta.insertId)
            return res.status(200).send({
                status: 'success',
                message: 'Se ha registrado el representante legal con éxito.'
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error registrando el representante legal.'
            })
        })
    },
    update_legal_representant: (req, res) => {
        let representante = req.body.legal_representant
        let idRepresentante = req.params.id
        representante.rele_id = idRepresentante
        RepresentanteLegal.updateLegalRepresentant(representante).then(respuesta => {
            return res.status(200).send({
                status: 'success',
                message: 'Se ha editado el representante legal con éxito.'
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error editando el representante legal.'
            })
        })
    },
    list_legal_representant: (req, res) => {
        RepresentanteLegal.getLegalRepresentants(req.body).then(respuesta => {
            return res.status(200).send({
                status: 'success',
                data: respuesta
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los representantes.'
            })
        })
    },
    legal_representant_by_id: (req, res) => {
        let id = req.params.id
        RepresentanteLegal.getLegalRepresentantById(id).then(respuesta => {
            return res.status(200).send({
                status: 'success',
                data: respuesta
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error buscando el representante legal.'
            })
        })
    },
}

module.exports = controller