var express = require('express');
var authController = require('../controller/Controller');
const {RuleDataExists}  = require('../middleware/Middleware');//fetch middleware

var router = express(); //call express router function

router.get('/', authController.return_details); //call function to return Author details on GETrequest

router.post('/validate-rule',RuleDataExists, authController.validate_rule); // call function to validate rule against data on POST request

module.exports = router;//export router