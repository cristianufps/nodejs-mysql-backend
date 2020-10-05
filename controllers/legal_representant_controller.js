'use strict'

var RepresentanteLegal = require('../models/legal-representant')
const db = require('../config/bd')
var controller = {

    create_legal_representant: async(req, res) => {
        let con = await db.getConnection();
        let representante = req.body.legal_representant
        try {
            let resp = await RepresentanteLegal.insertLegalRepresentant(con, representante)
            if (resp) {
                console.log("res insert --- -> ", resp.insertId)
                return res.status(200).send({
                    status: 'success',
                    message: 'Se ha registrado el representante legal con éxito.'
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error registrando el representante legal.'
            })
        } finally {
            console.log("--------- FINALLY create_legal_representant --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    update_legal_representant: async(req, res) => {
        let con = await db.getConnection();
        let representante = req.body.legal_representant
        let idRepresentante = req.params.id
        representante.rele_id = idRepresentante

        try {
            let resp = await RepresentanteLegal.updateLegalRepresentant(con, representante)
            if (resp) {
                return res.status(200).send({
                    status: 'success',
                    message: 'Se ha editado el representante legal con éxito.'
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error editando el representante legal.'
            })
        } finally {
            console.log("--------- FINALLY update_legal_representant --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    list_legal_representant: async(req, res) => {
        let con = await db.getConnection();
        try {
            let resp = await RepresentanteLegal.getLegalRepresentants(con, req.body)
            if (resp) {
                return res.status(200).send({
                    status: 'success',
                    data: resp
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los representantes.'
            })
        } finally {
            console.log("--------- FINALLY list_legal_representant --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    legal_representant_by_id: async(req, res) => {
        let con = await db.getConnection();
        let id = req.params.id
        try {
            let resp = await RepresentanteLegal.getLegalRepresentantById(con, id)
            if (resp) {
                return res.status(200).send({
                    status: 'success',
                    data: resp
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error buscando el representante legal.'
            })
        } finally {
            console.log("--------- FINALLY legal_representant_by_id --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
}

module.exports = controller