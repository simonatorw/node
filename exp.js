const express = require('express');
const devConfig = require('./development');

module.exports = function(str) {
	const app = express();

	//app.use('/views', express.static('views'));
	app.set('views', './ejs');
	app.set('view engine', 'ejs');
	
	app.get('/', function(req, res) {
		res.render('index', {
			title: 'Hello World',
			motto: 'Booyah biatchz'
		});

	});

	app.listen(8080);
	console.log('Server running on 8080...')
};