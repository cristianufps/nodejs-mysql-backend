'use strict'

var Alerta = require('../models/alert')
const db = require('../config/bd')
var controller = {
    list_alerts: async(req, res) => {
        let con = await db.getConnection();
        try {
            let resp = await Alerta.getAlerts(con)
            if (resp) {
                return res.status(200).send({
                    status: 'success',
                    resp
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando las alertas.'
            })
        } finally {
            console.log("--------- FINALLY list_alerts --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    list_alerts_no_view: async(req, res) => {
        let con = await db.getConnection();
        try {
            let resp = await Alerta.getAlertsNotView(con)
            if (resp) {
                return res.status(200).send({
                    status: 'success',
                    resp
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando las alertas.'
            })
        } finally {
            console.log("--------- FINALLY list_alerts_no_view --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    mark_seen_alert: async(req, res) => {
        let con = await db.getConnection();
        let alert = req.body.alert
        console.log("---------- ", alert)
        try {
            let resp = await Alerta.markSeenAlert(con, alert)
            if (resp) {
                return res.status(200).send({
                    status: 'success',
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error.'
            })
        } finally {
            console.log("--------- FINALLY mark_seen_alert --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
}

module.exports = controller