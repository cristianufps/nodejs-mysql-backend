'use strict'

var express = require('express')
var RequestController = require('../controllers/request_controller')
var router = express.Router()

router.get('/request_by_id/:id', RequestController.request_by_id)
router.get('/list_request', RequestController.list_request)
router.post('/create_request', RequestController.create_request)
router.put('/update_request/:id', RequestController.update_request)
router.delete('/delete_request/:id', RequestController.delete_request)
router.post('/response_request', RequestController.response_request)

module.exports = router