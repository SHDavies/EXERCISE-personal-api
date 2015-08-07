var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use('/', function() {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
});

app.use('/', bodyParser());

app.get('/name', function(req, res) {
	var name = {name: 'Spencer'};
	res.send(JSON.stringify(name));
})

app.listen(8887);