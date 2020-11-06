'use strict'

var express = require('express')
var AlertController = require('../controllers/alert_controller')
var router = express.Router()

router.get('/list_alerts', AlertController.list_alerts)
router.get('/list_alerts_not_view', AlertController.list_alerts_no_view)
router.put('/mark_seen_alert', AlertController.mark_seen_alert)

module.exports = router