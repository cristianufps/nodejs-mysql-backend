'use strict'

var Convenio = require('../models/agreement')
var Student = require('../models/student')
const excel = require('exceljs');
const db = require('../config/bd')
var controller = {
    excel_agreements: async(req, res) => {
        let con = await db.getConnection();
        try {
            let response = await Convenio.getAgreementsExcel(con)
            if (response) {
                let workbook = new excel.Workbook(); //creating workbook
                let worksheet = workbook.addWorksheet('Convenios'); //creating worksheet
                let headers = Object.keys(response[0])
                let columns = []
                    //  WorkSheet Header
                for (let i = 0; i < headers.length; i++) {
                    let column = {
                        header: headers[i],
                        key: headers[i],
                        style: { font: { bold: true } }
                    }
                    columns.push(column)
                }
                columns.forEach(column => {
                    column.width = column.header.length < 12 ? 12 : column.header.length
                })
                worksheet.columns = columns
                worksheet.addRows(response);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', 'attachment; filename=' + 'convenios.xlsx');

                return workbook.xlsx.write(res)
                    .then(function() {
                        res.status(200).end();
                    });
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los convenios.'
            })
        } finally {
            console.log("--------- FINALLY excel_agreements--------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    excel_students: async(req, res) => {
        let con = await db.getConnection();
        try {
            let response = await Student.getStudentsExcel(con)
            if (response) {
                let workbook = new excel.Workbook(); //creating workbook
                let worksheet = workbook.addWorksheet('Estudiantes'); //creating worksheet
                let headers = Object.keys(response[0])
                let columns = []
                    //  WorkSheet Header
                for (let i = 0; i < headers.length; i++) {
                    let column = {
                        header: headers[i],
                        key: headers[i],
                        style: { font: { bold: true } }
                    }
                    columns.push(column)
                }
                columns.forEach(column => {
                    column.width = column.header.length < 12 ? 12 : column.header.length
                })
                worksheet.columns = columns
                worksheet.addRows(response);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', 'attachment; filename=' + 'estudiantes.xlsx');

                return workbook.xlsx.write(res)
                    .then(function() {
                        res.status(200).end();
                    });
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los convenios.'
            })
        } finally {
            console.log("--------- FINALLY excel_student--------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    excel_students_by_agreement: async(req, res) => {
        let con = await db.getConnection();
        let id = req.params.id
        try {
            let response = await Student.getStudentsExcelByAgreement(con, id)
            if (response) {
                let workbook = new excel.Workbook(); //creating workbook
                let worksheet = workbook.addWorksheet('Estudiantes'); //creating worksheet
                let headers = Object.keys(response[0])
                let columns = []
                    //  WorkSheet Header
                for (let i = 0; i < headers.length; i++) {
                    console.log("--qq", i);
                    let column = {
                        header: headers[i],
                        key: headers[i],
                        style: { font: { bold: true } }
                    }
                    columns.push(column)
                }
                columns.forEach(column => {
                    column.width = column.header.length < 12 ? 12 : column.header.length
                })
                console.log("--ii qq", response);

                worksheet.columns = columns
                worksheet.addRows(response);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', 'attachment; filename=' + 'estudiantes_convenio.xlsx');

                return workbook.xlsx.write(res)
                    .then(function() {
                        res.status(200).end();
                    });
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los estudiantes.'
            })
        } finally {
            console.log("--------- FINALLY excel_students_by_agreement--------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
}

module.exports = controller