var express = require('express');
var router = express.Router();
var middleware = require('../middleware');


router.get('/', function(req, res) {
	res.send('Hello');
})

module.exports = router;