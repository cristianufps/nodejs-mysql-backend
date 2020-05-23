'use strict'

var TipoConvenio = require('../models/type_agreement')

var controller = {

    create_type_agreement: (req, res) => {
        let typeAgreement = req.body.type_agreement
        TipoConvenio.insertTypeAgreement(typeAgreement).then(respuesta => {
            console.log("res insert --- -> ", respuesta.insertId)
            return res.status(200).send({
                status: 'success',
                message: 'Se ha registrado el tipo de convenio con éxito.'
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error registrando el tipo de convenio.'
            })
        })
    },
    update_type_agreement: (req, res) => {
        let typeAgreement = req.body.type_agreement
        let idTypeAgreement = req.params.id
        typeAgreement.tico_id = idTypeAgreement
        TipoConvenio.updateTypeAgreement(typeAgreement).then(respuesta => {
            return res.status(200).send({
                status: 'success',
                message: 'Se ha editado el tipo de convenio con éxito.'
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error editando el tipo de convenio.'
            })
        })
    },
    list_type_agreements: (req, res) => {
        TipoConvenio.getTypesAgreements(req.body).then(respuesta => {
            return res.status(200).send({
                status: 'success',
                data: respuesta
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los tipos de convenios.'
            })
        })
    },
    type_agreement_by_id: (req, res) => {
        let id = req.params.id
        TipoConvenio.getTypeAgreementById(id).then(respuesta => {
            return res.status(200).send({
                status: 'success',
                data: respuesta
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los tipos de convenios.'
            })
        })
    },
}

module.exports = controller