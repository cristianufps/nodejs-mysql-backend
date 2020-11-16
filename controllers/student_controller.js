'use strict'

var Student = require('../models/student')
const db = require('../config/bd')
var controller = {

    create_student: async(req, res) => {
        var con = await db.getConnection();
        let est = req.body.category

        try {
            let respuesta = await Student.insertStudent(con, est)
            if (respuesta) {
                console.log("res insert --- -> ", respuesta.insertId)
                return res.status(200).send({
                    status: 'success',
                    message: 'Se ha registrado el estudiante con éxito.'
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error registrando  el estudiante.'
            })
        } finally {
            console.log("--------- FINALLY create_category --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    },
    update_student: async(req, res) => {
        var con = await db.getConnection();
        let est = req.body.student
        let idStudent = req.params.id
        est.estu_id = idStudent

        try {
            let respuesta = await Student.updateStudent(con, est)
            if (respuesta) {
                return res.status(200).send({
                    status: 'success',
                    message: 'Se ha editado el estudiante con éxito.'
                })
            }

        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error editando el estudiante.'
            })
        } finally {
            console.log("--------- FINALLY update_student --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    list_student: async(req, res) => {
        var con = await db.getConnection();
        try {
            let response = await Student.getStudents(con, req.body)
            if (response) {
                return res.status(200).send({
                    status: 'success',
                    data: response
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los estudiantes.'
            })
        } finally {
            console.log("--------- FINALLY list_student --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    student_by_id: async(req, res) => {
        var con = await db.getConnection();
        let id = req.params.id
        try {
            let response = await Student.getStudentById(con, id)
            if (response) {
                return res.status(200).send({
                    status: 'success',
                    data: response
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los estudiantes.'
            })
        } finally {
            console.log("--------- FINALLY student_by_id --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    },
}

module.exports = controller