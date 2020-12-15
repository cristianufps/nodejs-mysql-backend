'use strict'

var express = require('express')
var StudentController = require('../controllers/student_controller')
var router = express.Router()

router.get('/student_by_id/:id', StudentController.student_by_id)
router.get('/students_by_agreement/:id', StudentController.students_by_agreement)
router.get('/list_student', StudentController.list_student)
router.post('/create_student', StudentController.create_student)
router.put('/update_student/:id', StudentController.update_student)

module.exports = router