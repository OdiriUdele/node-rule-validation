var express = require('express');
var authController = require('../controller/Controller')

var router = express.Router();

router.get('/', authController.return_details);

router.post('/validate-rule', authController.validate_rule);

module.exports = router;