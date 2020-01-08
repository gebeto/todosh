const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const CONFIG = require('@wsl/config');

const app = express();


app.use('/dist', express.static(path.resolve(__dirname, "../frontend/dist")));

app.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/auth', async function (req, res) {
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

	res.send(`<script> localStorage.setItem("access_token", "${response.access_token}"); window.location.href = "/"; </script>`)
});

app.listen(CONFIG.PORT, function () {
	console.log(`App listening on port ${CONFIG.PORT}!`);
});