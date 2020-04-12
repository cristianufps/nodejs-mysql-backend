'use strict'

var express = require('express')
var UserController = require('../controllers/user')

var router = express.Router()

router.get('/usuarios', UserController.usuarios)
router.get('/edinson', UserController.edinson)
router.get('/user_by_id/:id', UserController.user_by_id)


module.exports = router