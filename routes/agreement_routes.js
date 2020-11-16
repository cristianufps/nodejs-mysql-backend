'use strict'

var express = require('express')
var ConvenioController = require('../controllers/agreement_controller')
var UtilController = require('../controllers/util_controller')
var router = express.Router()
const docs = require('../util/docs');

router.get('/agreement_by_id/:id', ConvenioController.agreement_by_id)
router.get('/list_agreements', ConvenioController.list_agreements)
router.get('/list_agreements_parents', ConvenioController.list_agreements_parents)
router.get('/list_agreements_specific', ConvenioController.list_agreements_specific)
router.get('/cron', ConvenioController.cron)

router.put('/update_agreement/:id', ConvenioController.update_agreement)

router.post('/create_agreement', ConvenioController.create_agreement)
router.post('/upload_doc/:id', docs.multer.single('image'),
    docs.sendUploadToGCS, ConvenioController.upload_doc)

router.delete('/delete_agreement_by_id/:id', ConvenioController.delete_agreement_by_id)



module.exports = router