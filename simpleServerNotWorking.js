var http = require('http');
var express = require('express');
var request = require('request');

var url2 = 'http://m.lowes.com/CatalogServices/product/nvalue/v1_0?nValue=4294857975&maxResults=6&showURL=1&rollUpVariants=1&showUrl=true&storeNumber=0595&priceFlag=rangeBalance&showMarketingBullets=1';

function getData(url, res) {
	request(url, (error, response, body)=> {
	  if (!error && response.statusCode === 200) {
		var fbResponse = JSON.parse(body)
		var raw = body;
		console.log("Got a response: ", fbResponse)
		if (res) {
			res.send(raw);
		}
	  } else {
		console.log("Got an error: ", error, ", status code: ", response.statusCode)
	  }
	});
}

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

const app = express();
app.use(allowCrossDomain);
const server = require('http').createServer(app);

server.listen(8124, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8124');

app.get('/', function(req, res) {
	getData(url2, res);
});