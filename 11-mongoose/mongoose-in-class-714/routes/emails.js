var express = require('express');
var router = express.Router();
var Emails = require('../models/emails.js')
<<<<<<< HEAD
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
=======

/* GET users listing. */
router.get('/', function(req, res, next) {
  Emails
    .find()
    .exec(function(err, data) {
      if (err) {
        res.send("oops! db error")
      } else {
        res.json(data)
      }
    })
})

router.get('/:sender', function(req, res, next) {
  Emails
    .where('sender').regex(new RegExp(req.params.sender, 'i'))
    .exec(function(err, data) {
      if (err) {
        res.send("oops! db error")
      } else {
        res.json(data)
      }
    })
})

>>>>>>> upstream/master
module.exports = router;
