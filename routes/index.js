var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
var request = require('request');


var API_KEY = '369b9e8838df87b945aa6f8986fcc5a8';
var url = 'https://api.darksky.net/forecast/369b9e8838df87b945aa6f8986fcc5a8/37.8267,-122.4233';

router.get('/', function(req, res) {
	request(url, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			var parsedData = JSON.parse(body);
			res.render('index', {data: parsedData});
		}
	})

});



module.exports = router;
