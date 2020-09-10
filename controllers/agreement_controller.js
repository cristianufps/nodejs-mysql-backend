'use strict'
var Email = require('../util/email')
var Convenio = require('../models/agreement')
var Usuario = require('../models/user')

var controller = {

    create_agreement: (req, res) => {
        let convenio = req.body.agreement
        if (convenio.conv_padre == "") {
            convenio.conv_padre = null
        }
        Convenio.insertAgreement(convenio).then(respuesta => {
            console.log("res insert --- -> ", respuesta.insertId)
            return res.status(200).send({
                status: 'success',
                message: 'Se ha registrado el convenio con éxito.'
            })
        }).catch(err => {
            console.log("Error insert convenio ", err)
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error registrando el convenio'
            })
        })
    },
    update_agreement: (req, res) => {
        let convenio = req.body.agreement
        let idConvenio = req.params.id
        convenio.conv_id = idConvenio
        Convenio.updateAgreement(convenio).then(respuesta => {
            return res.status(200).send({
                status: 'success',
                message: 'Se ha editado el convenio con éxito.'
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error editando el convenio.'
            })
        })
    },
    list_agreements: (req, res) => {
        Convenio.getAgreements().then(respuesta => {
            return res.status(200).send({
                status: 'success',
                data: respuesta
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los convenios.'
            })
        })
    },
    agreement_by_id: (req, res) => {
        let id = req.params.id
        Convenio.getAgreementById(id).then(respuesta => {
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
    list_agreements_parents: (req, res) => {
        Convenio.getAgreementsParents().then(respuesta => {
            return res.status(200).send({
                status: 'success',
                data: respuesta
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los convenios.'
            })
        })
    },
    cron: (req, res) => {
        console.log("<<<<<<<<<  CRON  >>>>>>>>  ")
        Usuario.getEmailUsersAdmin().then(admins => {
            Convenio.getAgreementsAboutToExpire().then(convenios => {
                let bodyEmail = ""
                if (convenios.length > 0) {
                    bodyEmail += "<p> Advertencia: Tienes <b>Convenios</b> que expiran este mes. </p><br>"
                    let myTable = "<table><tr>";
                    myTable += "<td style='width: 200px; color: red;font-weight: bold;'>Nombre</td>";
                    myTable += "<td style='width: 200px; color: red;font-weight: bold;'>Fecha final</td></tr>";
                    for (let i = 0; i < convenios.length; i++) {
                        myTable += "<tr><td style='width: 200px;'>" + convenios[i].conv_nombre + "</td>";
                        myTable += "<td style='width: 200px;'>" + convenios[i].conv_fechafinal + "</td>";
                        myTable += "</tr>";
                    }
                    myTable += "</table>";
                    bodyEmail += myTable
                } else {
                    bodyEmail += "<p> Información:No tienes <b>Convenios</b> que expiran este mes. </p>"
                }

                let envio = admins.map(function(x) {
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
            }).catch(err => {
                console.log("ERROR CRON -->> ", err)
            })
        }).catch(err => {
            console.log("ERROR CRON  getUsersAdmin-->> ", err)
        })


    },
    upload_doc: (req, res, next) => {
        if (req.file && req.file.cloudStoragePublicUrl) {
            let name = req.file.cloudStorageObject

            name = name.split("/")[1]

            let convenio = {
                conv_id: req.params.id,
                conv_soporte: name
            }
            Convenio.uploadDocument(convenio).then(respuesta => {
                return res.status(200).send({
                    status: 'success',
                    message: 'Se ha cargado el archivo con éxito',
                    url: name
                })
            }).catch(err => {
                return res.status(404).send({
                    status: 'Error',
                    message: 'Se ha producido un error editando el convenio.'
                })
            })
        } else {
            return res.status(404).send({
                status: "Error",
                message: 'Ha ocurrido un error subiendo el archivo'
            })
        }
    },
    list_agreements_specific: (req, res) => {
        Convenio.getAgreementsSpecific().then(respuesta => {
            return res.status(200).send({
                status: 'success',
                data: respuesta
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los convenios.'
            })
        })
    },
}



module.exports = controller