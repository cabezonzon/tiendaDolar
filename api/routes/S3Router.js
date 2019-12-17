var express = require('express');
var S3Controller = require('../controllers/S3Controller');

//call the router
var router = express.Router();

//the filename is the name of the file you want to 
//download in this case db.json
router.get('/download/:filename',  S3Controller.doDownload);

module.exports = router;
