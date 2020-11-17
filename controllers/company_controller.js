'use strict'

const { response } = require('express');
var Empresa = require('../models/company')
const db = require('../config/bd')
var controller = {

    create_company: async(req, res) => {
        let con = await db.getConnection();
        let empresa = req.body.company

        try {
            let val = await Empresa.validateNit(con, empresa.empr_nit)
            console.log("validate nit -<> ", val)
            if (val) {
                return res.status(200).send({
                    status: 'success',
                    message: 'El nit de la empresa ya existe',
                    error: true
                })
            } else {
                let resp = await Empresa.insertCompany(con, empresa)
                if (resp) {
                    console.log("res insert --- -> ", resp.insertId)
                    return res.status(200).send({
                        status: 'success',
                        message: 'Se ha registrado la empresa con éxito.',
                        error: false
                    })
                }
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error registrando la empresa'
            })
        } finally {
            console.log("--------- FINALLY create_company --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    update_company: async(req, res) => {
        let con = await db.getConnection();
        let empresa = req.body.company
        let idEmpresa = req.params.id
        empresa.empr_id = idEmpresa

        try {
            let val = await Empresa.validateNitUpdate(con, empresa)
            console.log("validate nit -<> ", val)
            if (val) {
                return res.status(200).send({
                    status: 'success',
                    message: 'El nit de la empresa ya existe',
                    error: true
                })
            } else {
                let resp = await Empresa.updateCompany(con, empresa)
                if (resp) {
                    return res.status(200).send({
                        status: 'success',
                        message: 'Se ha editado la empresa con éxito.',
                        error: false
                    })
                }
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error editando la empresa.'
            })
        } finally {
            console.log("--------- FINALLY create_category --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    list_company: async(req, res) => {
        let con = await db.getConnection();
        try {
            let resp = await Empresa.getCompanies(con, req.body)
            if (resp) {
                return res.status(200).send({
                    status: 'success',
                    data: resp
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando las empresas.'
            })
        } finally {
            console.log("--------- FINALLY list_company --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    },
    company_by_id: async(req, res) => {
        let con = await db.getConnection();
        let id = req.params.id

        try {
            let resp = await Empresa.getCompanyById(con, id)
            if (resp) {
                return res.status(200).send({
                    status: 'success',
                    data: resp
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error buscando la empresa.'
            })
        } finally {
            console.log("--------- FINALLY create_category --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    delete_company_by_id: async(req, res) => {
        let con = await db.getConnection();
        let id = req.params.id

        try {
            let val = await Empresa.getAgremmentsByCompanyId(con, id)
            console.log("res delete --- -> ", val)
            if (val) {
                return res.status(200).send({
                    status: 'success',
                    agremments: resp,
                    error: true
                })
            } else {
                let resp = await Empresa.deleteCompanyById(con, id)
                console.log("res deleteCompanyById --- -> ", resp)
                return res.status(200).send({
                    status: 'success',
                    message: 'Se ha eliminado la empresa con éxito.',
                    error: false
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error buscando la empresa.'
            })
        } finally {
            console.log("--------- FINALLY delete_company_by_id --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
}

module.exports = controller