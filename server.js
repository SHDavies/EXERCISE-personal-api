var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use('/', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use('/', bodyParser.json());

var hobbies = {hobbies: ["football", "politics", "gaming", "coding", "fishing"]};
var loc = {location: "Provo, UT"};
var name = {name: 'Spencer'};
var occupations = {occupations: ["Boostability", "Walmart", "Allen's", "Boswell"]};

//GET requests
app.get('/name', function(req, res) {
	res.send(JSON.stringify(name));
})

app.get('/location', function(req, res) {
	res.send(JSON.stringify(loc));
})

app.get('/hobbies', function(req, res) {
	res.send(JSON.stringify(hobbies));
})

app.get('/hobbies/:order', function(req, res, next) {
	if (req.params.order === "order=desc") {
		var hobbiesDesc = hobbies.hobbies.sort();
		res.send(JSON.stringify({
			hobbies: hobbiesDesc
		}))
	} else if (req.params.order === "order=asc") {
		var hobbiesAsc = hobbies.hobbies.sort().reverse();
		res.send(JSON.stringify({
			hobbies: hobbiesAsc
		}))
	} else {
		next()
	}
})

app.get('/occupations', function(req, res) {
	res.send(JSON.stringify(occupations));
})

app.get('/occupations/:order', function(req, res, next) {
	if (req.params.order === "order=desc") {
		var occupationsDesc = occupations.occupations.sort();
		res.send(JSON.stringify({
			occupations: occupationsDesc
		}))
	} else if (req.params.order === "order=asc") {
		var occupationsAsc = occupations.occupations.sort().reverse();
		res.send(JSON.stringify({
			occupations: occupationsAsc
		}))
	} else {
		next();
	}
})

app.get('/occupations/latest', function(req, res) {
	var latest = occupations.occupations[0];
	res.send(JSON.stringify({
		occupation: latest
	}))
})

//PUT and POST requests
app.put('/name', function(req, res) {
	name.name = req.body.name;
	res.send(JSON.stringify(name));
})

app.put('/location', function(req, res) {
	loc.location = req.body.location;
	res.send(JSON.stringify(loc));
})

app.post('/hobbies', function(req, res) {
	hobbies.hobbies.push(req.body.hobby)
	res.send(JSON.stringify(hobbies))
})

app.post('/occupations', function(req, res) {
	occupations.occupations.push(req.body.occupation)
	res.send(JSON.stringify(occupations))
})

//skills endpoint
var skills = [
	{
		id: 1,
		name: 'JavaScript',
		experience: '"Expert"'
	},
	{
		id: 2,
		name: 'HTML',
		experience: 'Intermediate'
	},
	{
		id: 3,
		name: 'CSS',
		experience: 'Beginner'
	},
	{
		id: 4,
		name: 'AngularJS',
		experience: "Intermediate"
	},
	{
		id: 5,
		name: 'NodeJS',
		experience: 'Beginner'
	}
];

app.get('/skills', function(req, res) {
	if (req.query.experience) {
		var results = [];
		for (var i = 0; i < skills.length; i++) {
			if (skills[i].experience === req.query.experience) {
				results.push(skills[i])
			}
		}
		res.send({
			skills: results
		})
	} else {
		res.send({
			skills: skills
		});
	}
})

app.listen(8887);