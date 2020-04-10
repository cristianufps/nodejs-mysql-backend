'use strict'

var express = require('express')
var authController = require('../controllers/auth')

var router = express.Router()

router.post('/login', authController.login)
router.post('/forgot', authController.forgot)
router.get('/me', authController.me)
router.post('/reset', authController.reset)

module.exports = router

