var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
var request = require('request');

var API_KEY = '&APPID=ef328b71e4664319163442c800054e65'
var url = 'http://api.openweathermap.org/data/2.5/weather?q=death%20valley,us'

var options = {
	url: url,
	headers: {
		'APPID': API_KEY
	}
}

router.get('/', function(req, res) {
	request(url + API_KEY, function(error, response, body) {
	if (!error && response.statusCode == 200) {
		var parsedData = JSON.parse(body);
		res.render('index', {data: parsedData})
		}
	});
})

module.exports = router;
