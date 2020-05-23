'use strict'

var express = require('express')
var CategoryController = require('../controllers/category_controller')
var router = express.Router()

router.get('/category_by_id/:id', CategoryController.category_by_id)
router.get('/list_category', CategoryController.list_category)
router.post('/create_category', CategoryController.create_category)
router.put('/update_category/:id', CategoryController.update_category)

module.exports = router