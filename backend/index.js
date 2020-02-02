const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const CONFIG = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
	res.send('Hello world!');
});

const data = {};

app.post('/auth', function(req, res) {
	data.redirect = req.body.redirect;
	const redirectUrl = `${req.protocol}://${req.headers.host}/auth-success`;
	const authUrl = `https://www.wunderlist.com/oauth/authorize?client_id=${CONFIG.client_id}&redirect_uri=${redirectUrl}&state=${CONFIG.client_secret}`;
	res.redirect(301, authUrl);
});


app.get('/auth-success', async function(req, res) {
	const response = await fetch("https://www.wunderlist.com/oauth/access_token", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			client_id: CONFIG.client_id,
			client_secret: CONFIG.client_secret,
			code: req.query.code,
		}),
	}).then(res => res.json());

	res.redirect(301, `${data.redirect}?access_token=${response.access_token}&client_id=${CONFIG.client_id}`);
});


app.listen(CONFIG.PORT, function() {
	console.log(`App listening on port ${CONFIG.PORT}!`);
});
