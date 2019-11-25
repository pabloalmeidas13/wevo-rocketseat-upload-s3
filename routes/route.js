var express = require("express");
var multer  = require('multer');

const router = express.Router();
const controller = require('../controllers/controller');
const multerConfig = require('../config/multer');

router.post("/upload/aws-sdk", multer().single('file'), controller.uploadAwsSdk);
router.post("/upload/multer-s3", multer(multerConfig).single('file'), controller.uploadS3);

module.exports = router;