const fs = require('fs');
const connect = require('connect');

function logger(req, res, next) {
	console.log(req.method, req.url);
	next();
}

function goodbye(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('Goodbye!');
}

fs.readFile('./hello.txt', 'utf8', function(err, data) {
	if (err) {
		return console.log(err);
	}
	
	const app = connect();
	
	function dog(req, res, next) {
		res.setHeader('Content-Type', 'text/plain');
		res.end(data);
	}
	
	app.use(logger);
	app.use('/dog', dog);
	app.use('/goodbye', goodbye);
	app.listen(3000);
	console.log('Running server...');
});