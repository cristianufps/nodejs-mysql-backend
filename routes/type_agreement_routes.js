'use strict'

var express = require('express')
var TypeAgreementController = require('../controllers/type_agreement_controller')
var router = express.Router()

router.get('/type_agreement_by_id/:id', TypeAgreementController.type_agreement_by_id)
router.get('/list_type_agreement', TypeAgreementController.list_type_agreements)
router.post('/create_type_agreement', TypeAgreementController.create_type_agreement)
router.put('/update_type_agreement/:id', TypeAgreementController.update_type_agreement)

module.exports = router