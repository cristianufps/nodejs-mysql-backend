'use strict'

var express = require('express')
var EmpresaController = require('../controllers/company_controller')
var router = express.Router()

router.get('/company_by_id/:id', EmpresaController.company_by_id)
router.get('/list_company', EmpresaController.list_company)
router.post('/create_company', EmpresaController.create_company)
router.put('/update_company/:id', EmpresaController.update_company)

module.exports = router