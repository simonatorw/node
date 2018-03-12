const express = require('express');
const app = express();
const compress = require('compression');
const session = require('express-session');

function hasName(req, res, next) {
	if (req.query.name) {
		next();
	} else {
		res.send('What is your name?');
	}
}

function sayHello(req, res, next) {
	res.send(`Hello ${req.query.name}`);
}
//app.use(compress());
app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: 'sessionSecret'
}));
app.set('views', './ejs');
app.set('view engine', 'ejs');
app.get('/', hasName, sayHello);
app.get('/views', (req, res) => {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}
	req.session.lastVisit = new Date();
	res.render('index', {
		title: 'Simon World',
		motto: 'The best is yet to come'
	});
});

app.listen(3000);
app.use(express.static('./public'));
console.log('Server running...');