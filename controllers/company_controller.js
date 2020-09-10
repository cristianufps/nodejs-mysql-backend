'use strict'

var Empresa = require('../models/company')

var controller = {

    create_company: (req, res) => {
        let empresa = req.body.company
        Empresa.insertCompany(empresa).then(respuesta => {
            console.log("res insert --- -> ", respuesta.insertId)
            return res.status(200).send({
                status: 'success',
                message: 'Se ha registrado la empresa con éxito.'
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error registrando la empresa'
            })
        })
    },
    update_company: (req, res) => {
        let empresa = req.body.company
        let idEmpresa = req.params.id
        empresa.empr_id = idEmpresa
        Empresa.updateCompany(empresa).then(respuesta => {
            return res.status(200).send({
                status: 'success',
                message: 'Se ha editado la empresa con éxito.'
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error editando la empresa.'
            })
        })
    },
    list_company: (req, res) => {
        Empresa.getCompanies(req.body).then(respuesta => {
            return res.status(200).send({
                status: 'success',
                data: respuesta
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando las empresas.'
            })
        })
    },
    company_by_id: (req, res) => {
        let id = req.params.id
        Empresa.getCompanyById(id).then(respuesta => {
            return res.status(200).send({
                status: 'success',
                data: respuesta
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error buscando la empresa.'
            })
        })
    },
}

module.exports = controller