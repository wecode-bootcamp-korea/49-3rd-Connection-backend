const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
require('dotenv').config();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Readable } = require('stream');

const s3Client = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp'];

const imageUploader = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: 'wecode-connection',
    key: (req, file, callback) => {
      const uploadDirectory = req.query.directory ?? '';
      const extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error('wrong extension'));
      }
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
    },
    acl: 'public-read-write',
  }),
  fileFilter: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    if (!allowedExtensions.includes(extension)) {
      return callback(new Error('wrong extension'));
    }
    callback(null, true);
  },
});

module.exports = { imageUploader };
