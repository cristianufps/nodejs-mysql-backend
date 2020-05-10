'use strict'

var express = require('express')
var authController = require('../controllers/auth')

var router = express.Router()

router.post('/login', authController.login)
router.post('/forgot', authController.forgot)
router.get('/me', authController.me)
router.post('/reset', authController.reset)
router.get('/validate_password/:id/:password', authController.validatePassword)
router.put('/update_password/:id', authController.updatePass)

module.exports = router