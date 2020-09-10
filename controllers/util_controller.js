'use strict'

var Convenio = require('../models/agreement')
const excel = require('exceljs');

var controller = {

    excel_agreements: (req, res) => {
        Convenio.getAgreementsExcel().then(respuesta => {
            let workbook = new excel.Workbook(); //creating workbook
            let worksheet = workbook.addWorksheet('Convenios'); //creating worksheet
            let headers = Object.keys(respuesta[0])
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
            worksheet.addRows(respuesta);

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=' + 'convenios.xlsx');

            return workbook.xlsx.write(res)
                .then(function() {
                    res.status(200).end();
                });
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando los convenios.'
            })
        })
    },
}

module.exports = controller