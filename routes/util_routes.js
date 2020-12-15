'use strict'

var express = require('express')
var UtilController = require('../controllers/util_controller')
var router = express.Router()

router.get('/excel_agreements', UtilController.excel_agreements)
router.get('/excel_students', UtilController.excel_students)
router.get('/excel_students_by_agreement/:id', UtilController.excel_students_by_agreement)

module.exports = router