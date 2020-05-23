'use strict'

var express = require('express')
var RepresentanteController = require('../controllers/legal_representant_controller')
var router = express.Router()

router.get('/legal_representant_by_id/:id', RepresentanteController.legal_representant_by_id)
router.get('/list_legal_representant', RepresentanteController.list_legal_representant)
router.post('/create_legal_representant', RepresentanteController.create_legal_representant)
router.put('/update_legal_representant/:id', RepresentanteController.update_legal_representant)

module.exports = router