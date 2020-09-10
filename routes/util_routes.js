'use strict'

var express = require('express')
var UtilController = require('../controllers/util_controller')
var router = express.Router()

router.get('/excel_agreements', UtilController.excel_agreements)

module.exports = router