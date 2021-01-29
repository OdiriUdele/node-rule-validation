var express = require('express');
var authController = require('../controller/Controller')

var router = express.Router(); //call express router function

router.get('/', authController.return_details); //call function to return Author details on GETrequest

router.post('/validate-rule', authController.validate_rule); // call function to validate rule against data on POST request

module.exports = router;//export router