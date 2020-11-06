'use strict'
var Email = require('../util/email')
var Request = require('../models/request')
var Alert = require('../models/alert')
const db = require('../config/bd')
var Usuario = require('../models/user')
var controller = {
    create_request: async(req, res) => {
        var con = await db.getConnection();
        let body = req.body.request
        console.log(body)
        try {
            let respuesta = await Request.insertRequest(con, body)
            if (respuesta) {
                console.log("res insert --- -> ", respuesta.insertId)
                let alerta = {
                    soli_id: respuesta.insertId,
                    tial_id: 1
                }
                let resp2 = await Alert.insertAlert(con, alerta)
                if (resp2) {
                    let emails = await Usuario.getEmailUsersAdmin(con)
                    if (emails) {
                        let bodyEmail = ""
                        bodyEmail += "<p> Info: Tienes una <b>Solicitud</b> pendiente. </p><br>"
                        let myTable = "<table>";
                        myTable += "<tr><th>Responsable</th><td>" + body.soli_responsable + "</td></tr>"
                        myTable += "<tr><th>Celular</th><td>" + body.soli_celular + "</td></tr>"
                        myTable += "<tr><th>Correo</th><td>" + body.soli_correo + "</td></tr>"
                        myTable += "<tr><th>Descripción</th><td>" + body.soli_detalle + "</td></tr>"
                        myTable += "</table>";
                        bodyEmail += myTable

                        let envio = emails.map(function(x) {
                            return x.usua_correo
                        })
                        console.log("PARA >>>>>>>>  ", envio)
                        let datos = {
                            to: envio,
                            subject: 'Solicitud',
                            mail: bodyEmail
                        }
                        Email.send(datos).then(envio => {
                            console.log("SE ha enviado el correo")
                        }).catch(err => {
                            console.log("ERROR ENVIO -->> ", err)
                        })
                    }
                    return res.status(200).send({
                        status: 'success',
                        message: 'Se ha registrado la solicitud con éxito.'
                    })
                }
            }
        } catch (error) {
            console.log(error)
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error registrando la solicitud.'
            })
        } finally {
            console.log("--------- FINALLY create_request --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    },
    update_request: async(req, res) => {
        var con = await db.getConnection();
        let reques = req.body.request
        let idRequest = req.params.id
        reques.soli_id = idRequest

        try {
            let respuesta = await
            Request.updateRequest(con, reques)
            if (respuesta) {
                return res.status(200).send({
                    status: 'success',
                    message: 'Se ha editado la solicitud con éxito.'
                })
            }

        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error editando la solicitud.'
            })
        } finally {
            console.log("--------- FINALLY update_request --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    list_request: async(req, res) => {
        var con = await db.getConnection();
        try {
            let response = await Request.getRequest(con, req.body)
            if (response) {
                return res.status(200).send({
                    status: 'success',
                    data: response
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando las solicitudes.'
            })
        } finally {
            console.log("--------- FINALLY list_request --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    request_by_id: async(req, res) => {
        var con = await db.getConnection();
        let id = req.params.id
        try {
            let response = await Request.getRequestById(con, id)
            if (response) {
                return res.status(200).send({
                    status: 'success',
                    data: response
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando las categorias.'
            })
        } finally {
            console.log("--------- FINALLY list_category --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    },
    delete_request: async(req, res) => {
        var con = await db.getConnection();
        let id = req.params.id
        try {
            let respp = await Alert.deleteAlertByRequestId(con, id)
            if (respp.affectedRows > 0) {
                let response = await Request.deleteRequestById(con, id)
                if (response.affectedRows > 0) {
                    return res.status(200).send({
                        status: 'success',
                        message: 'Se han eliminado los registros'
                    })
                }
            }
        } catch (error) {
            console.log("Que paso? ", error)
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando las categorias.'
            })
        } finally {
            console.log("--------- FINALLY delete_request --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    },
    response_request: async(req, res) => {
        var con = await db.getConnection();
        let body = req.body.request
        console.log(body)
        try {
            let respuesta = await Request.changeStateRequest(con, body)
            if (respuesta) {
                console.log("res ipdate --- -> ", respuesta)
                let bodyEmail = ""
                bodyEmail += "<p><b>Cordial saludo</b></p><br>"
                bodyEmail += "<p>" + body.message + "</p><br>"
                console.log("PARA >>>>>>>>  ", body.soli_correo)
                let datos = {
                    to: body.soli_correo,
                    subject: 'Solicitud Repuesta',
                    mail: bodyEmail
                }
                Email.send(datos).then(envio => {
                    console.log("SE ha enviado el correo")
                }).catch(err => {
                    console.log("ERROR ENVIO -->> ", err)
                })

                return res.status(200).send({
                    status: 'success',
                    message: 'Se ha registrado la solicitud con éxito.'
                })

            }
        } catch (error) {
            console.log(error)
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error registrando la solicitud.'
            })
        } finally {
            console.log("--------- FINALLY create_request --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    },
}

module.exports = controller