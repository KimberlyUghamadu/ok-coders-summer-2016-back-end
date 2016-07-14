var express = require('express');
var router = express.Router();
var Emails = require('../models/emails.js')
/* GET users listing. */
router.get('/', function(req, res, next) {
  Emails.find().exec(function(err, data) {
   	if(err) {
	  res.send('OOPS! db error');
	}
	else {
	  res.json(data);
	}
   });
  //res.send();
});
//router.get('/:sender', function(req, res, next) {

//}
module.exports = router;
