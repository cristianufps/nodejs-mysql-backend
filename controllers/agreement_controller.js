'use strict'
var Email = require('../util/email')
var Convenio = require('../models/agreement')
var Usuario = require('../models/user')
const db = require('../config/bd')

var controller = {

    create_agreement: async(req, res, next) => {
        var con = await db.getConnection();
        let convenio = req.body.agreement

        try {
            convenio.conv_padre = convenio.conv_padre == "" ? null : convenio.conv_padre
            let respuesta = await Convenio.insertAgreement(con, convenio)
            if (respuesta) {
                console.log("res insert --- -> ", respuesta.insertId)
                return res.status(200).send({
                    status: 'success',
                    message: 'Se ha registrado el convenio con éxito.'
                })
            }

        } catch (error) {
            console.log("Error insert convenio ", error)
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error registrando el convenio'
            })
        } finally {
            console.log("--------- FINALLY create_agreement --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    },
    update_agreement: async(req, res) => {
        var con = await db.getConnection();
        let convenio = req.body.agreement
        let idConvenio = req.params.id
        convenio.conv_id = idConvenio

        try {
            let respuesta = await Convenio.updateAgreement(con, convenio)
            if (respuesta) {
                return res.status(200).send({
                    status: 'success',
                    message: 'Se ha editado el convenio con éxito.'
                })
            }

        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error editando el convenio.'
            })
        } finally {
            console.log("--------- FINALLY update_agreement --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    list_agreements: async(req, res) => {
        var con = await db.getConnection();
        try {
            let agreements = await Convenio.getAgreements(con)
            if (agreements) {
                return res.status(200).send({
                    status: 'success',
                    data: agreements
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los convenios.'
            })
        } finally {
            console.log("--------- FINALLY list_agreements --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    agreement_by_id: async(req, res) => {
        var con = await db.getConnection();
        let id = req.params.id
        try {
            let agre = await Convenio.getAgreementById(con, id)
            if (agre) {
                return res.status(200).send({
                    status: 'success',
                    data: agre
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error buscando la empresa.'
            })
        } finally {
            console.log("--------- FINALLY agreement_by_id --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    list_agreements_parents: async(req, res) => {
        var con = await db.getConnection();
        try {
            let agrements = await Convenio.getAgreementsParents(con)
            if (agrements) {
                return res.status(200).send({
                    status: 'success',
                    data: agrements
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los convenios.'
            })
        } finally {
            console.log("--------- FINALLY list_agreements_parents --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    },
    cron: async(req, res) => {
        console.log("<<<<<<<<<  CRON  >>>>>>>>  ")
        var con = await db.getConnection();
        try {
            let emails = await Usuario.getEmailUsersAdmin(con)
            if (emails) {
                let agrements = await Convenio.getAgreementsAboutToExpire(con)
                if (agrements) {
                    let bodyEmail = ""
                    if (agrements.length > 0) {
                        bodyEmail += "<p> Advertencia: Tienes <b>Convenios</b> que expiran este mes. </p><br>"
                        let myTable = "<table><tr>";
                        myTable += "<td style='width: 200px; color: red;font-weight: bold;'>Nombre</td>";
                        myTable += "<td style='width: 200px; color: red;font-weight: bold;'>Fecha final</td></tr>";
                        for (let i = 0; i < agrements.length; i++) {
                            myTable += "<tr><td style='width: 200px;'>" + agrements[i].conv_nombre + "</td>";
                            myTable += "<td style='width: 200px;'>" + agrements[i].conv_fechafinal + "</td>";
                            myTable += "</tr>";
                        }
                        myTable += "</table>";
                        bodyEmail += myTable
                    } else {
                        bodyEmail += "<p> Información:No tienes <b>Convenios</b> que expiran este mes. </p>"
                    }

                    let envio = emails.map(function(x) {
                        return x.usua_correo
                    })
                    console.log("PARA >>>>>>>>  ", envio)

                    let datos = {
                        to: envio,
                        subject: 'Alerta Temprana',
                        mail: bodyEmail
                    }

                    Email.send(datos).then(envio => {
                        console.log("SE ha enviado el correo")
                    }).catch(err => {
                        console.log("ERROR ENVIO -->> ", err)
                    })
                }
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los convenios.'
            })
        } finally {
            console.log("--------- FINALLY CRON --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    upload_doc: async(req, res, next) => {
        var con = await db.getConnection();
        try {
            console.log("req.file.cloudStoragePublicUrl ", req.file.cloudStoragePublicUrl)
            if (req.file && req.file.cloudStoragePublicUrl) {
                let name = req.file.cloudStorageObject
                name = name.split("/")[1]

                let convenio = {
                    conv_id: req.params.id,
                    conv_soporte: name
                }
                let respuesta = await Convenio.uploadDocument(con, convenio)
                if (respuesta) {
                    return res.status(200).send({
                        status: 'success',
                        message: 'Se ha cargado el archivo con éxito',
                        url: name
                    })
                }
            }

        } catch (error) {
            console.log("--------- Catch upload_doc --------", error)
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error editando el convenio.'
            })
        } finally {
            console.log("--------- FINALLY upload_doc --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    list_agreements_specific: async(req, res) => {
        var con = await db.getConnection();
        try {
            let agrements = await Convenio.getAgreementsSpecific(con)
            if (agrements) {
                return res.status(200).send({
                    status: 'success',
                    data: agrements
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los convenios.'
            })
        } finally {
            console.log("--------- FINALLY list_agreements_specific --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
}

module.exports = controller