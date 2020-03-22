'use strict'

var express = require('express')
var authController = require('../controllers/auth')

var router = express.Router()

router.post('/login', authController.login)
router.get('/me', authController.me)

module.exports = router

