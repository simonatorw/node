const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);

const WebSocketServer = require('websocket').server;
server.listen(8000, '127.0.0.1');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use('/views', express.static('views'));
app.use('/js', express.static('js'));

var tweets = [];

app.get('/id/:id?', function(req, res) {
	res.send(req.params.id);
});

app.get('/', function(req, res) {
	res.sendFile('/tmp/node/index.html');
});

app.post('/send', function(req, res) {
	console.log(req.body.tweet);
	if (req.body && req.body.tweet) {
		tweets.push(req.body.tweet);
		res.send({ status: 'ok', message: 'Tweet received', text: req.body.tweet });
	} else {
		res.send({ status: 'nok', message: 'Tweet not received' });
	}
});

app.post('/clear', function(req, res) {
	tweets = [];
});

app.get('/tweets', function(req, res) {
	res.send(tweets);
});

const wsServer = new WebSocketServer({
	httpServer: server
});

wsServer.on('request', function(request) {
	const connection = request.accept(null, request.origin);
	connection.on('message', function(msg) {
		console.log(msg);
	});
	
	setInterval(function() {
		let d = new Date();
		connection.sendUTF(JSON.stringify({
			hrs: d.getHours(),
			mins: d.getMinutes(),
			secs: d.getSeconds()
		}));
	}, 1000);
});