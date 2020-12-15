'use strict';
const { Storage } = require('@google-cloud/storage');
//development-production
const path = require("path");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const CLOUD_BUCKET = config.CLOUD_BUCKET;

function getPublicUrl(filename) {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

async function sendUploadToGCS(req, res, next) {
    console.log("ACA ESTAMOS ---------")
    const storage = await new Storage({
        projectId: config.GCLOUD_PROJECT,
        keyFilename: path.join(__dirname, '/../config/gcloud.json')
    });
    const bucket = await storage.bucket(CLOUD_BUCKET);
    console.log("ACA bucket ---------")
    if (!req.file) {
        return next();
    }
    let docName = req.file.originalname
    const gcsname = 'soportes_convenios/' + docName;
    const file = bucket.file(gcsname);
    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        },
        resumable: false
    });
    stream.on('error', (err) => {
        console.log("stream.on('error', (err)  ---------", err)
        req.file.cloudStorageError = err;
        next(err);
    });
    stream.on('finish', () => {
        console.log("stream.on('finisd', (err)  ---------")
        req.file.cloudStorageObject = gcsname;
        file.makePublic().then(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
            next();
        });
    });
    stream.end(req.file.buffer);
}

const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 20 * 1024 * 1024 // no larger than 10mb
    }
});
// [END multer]
module.exports = {
    getPublicUrl,
    sendUploadToGCS,
    multer
};