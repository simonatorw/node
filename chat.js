const net = require('net');

const chatServer = net.createServer();
const clientList = [];

chatServer.on('connection', function(client) {
	client.name = `${client.remoteAddress}:${client.remotePort}`;
	client.write('Hi!\n');
	clientList.push(client);
	
	client.on('data', function(data) {
		for (var i = 0; i < clientList.length; i+=1) {
			if (client !== clientList[i]) {
				clientList[i].write(`${client.name} says ${data}`);
			}
		}
	});
})

chatServer.listen(9000);

