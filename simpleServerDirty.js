var http = require('http');
var express = require('express');

var url = 'http://graph.facebook.com/517267866/?fields=picture';
var url2 = 'http://m.lowes.com/CatalogServices/product/nvalue/v1_0?nValue=4294857975&maxResults=6&showURL=1&rollUpVariants=1&showUrl=true&storeNumber=0595&priceFlag=rangeBalance&showMarketingBullets=1';
var fbResponse, raw;

var request = require('request')

request(url2, (error, response, body)=> {
  if (!error && response.statusCode === 200) {
    var fbResponse = JSON.parse(body)
	raw = body;
    console.log("Got a response: ", fbResponse)
  } else {
    console.log("Got an error: ", error, ", status code: ", response.statusCode)
  }
})

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
	res.send(raw);
});