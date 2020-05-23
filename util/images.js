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
    const storage = await new Storage({
        projectId: config.GCLOUD_PROJECT,
        keyFilename: path.join(__dirname, '/../config/gcloud.json')
    });
    const bucket = await storage.bucket(CLOUD_BUCKET);

    if (!req.file) {
        return next();
    }

    const gcsname = 'imagenes_perfil/' + req.file.originalname;
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        },
        resumable: false
    });

    stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        file.makePublic().then(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
            next();
        });
    });

    stream.end(req.file.buffer);
}
// [END process]

// Multer handles parsing multipart/form-data requests.
// This instance is configured to store images in memory.
// This makes it straightforward to upload to Cloud Storage.
// [START multer]
const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
});
// [END multer]

module.exports = {
    getPublicUrl,
    sendUploadToGCS,
    multer
};