'use strict'

var TipoConvenio = require('../models/type_agreement')
const db = require('../config/bd')
var controller = {

    create_type_agreement: async(req, res) => {
        let con = await db.getConnection();
        let typeAgreement = req.body.type_agreement

        try {
            let resp = await TipoConvenio.insertTypeAgreement(con, typeAgreement)
            if (resp) {
                console.log("res insert --- -> ", resp.insertId)
                return res.status(200).send({
                    status: 'success',
                    message: 'Se ha registrado el tipo de convenio con éxito.'
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error registrando el tipo de convenio.'
            })
        } finally {
            console.log("--------- FINALLY create_type_agreement --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    update_type_agreement: async(req, res) => {
        let con = await db.getConnection();
        let typeAgreement = req.body.type_agreement
        let idTypeAgreement = req.params.id
        typeAgreement.tico_id = idTypeAgreement

        try {
            let resp = await TipoConvenio.updateTypeAgreement(con, typeAgreement)
            if (resp) {
                return res.status(200).send({
                    status: 'success',
                    message: 'Se ha editado el tipo de convenio con éxito.'
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error editando el tipo de convenio.'
            })
        } finally {
            console.log("--------- FINALLY update_type_agreement --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    list_type_agreements: async(req, res) => {
        let con = await db.getConnection();

        try {
            let resp = await TipoConvenio.getTypesAgreements(con, req.body)
            if (resp) {
                return res.status(200).send({
                    status: 'success',
                    data: resp
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los tipos de convenios.'
            })
        } finally {
            console.log("--------- FINALLY list_type_agreements --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    type_agreement_by_id: async(req, res) => {
        let con = await db.getConnection();
        let id = req.params.id

        try {
            let resp = await TipoConvenio.getTypeAgreementById(con, id)
            if (resp) {
                return res.status(200).send({
                    status: 'success',
                    data: resp
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los tipos de convenios.'
            })
        } finally {
            console.log("--------- FINALLY type_agreement_by_id --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
}

module.exports = controller