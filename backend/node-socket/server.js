
var http = require('http');

var server = http.createServer((req, res) => {
  res.write('No ar');
  res.end();
});

server.listen(3000);
console.log('Servidor no ar');

////////////////////////////////////

var socket = require('socket.io');

var io = socket(server);

io.on('connection', (client) => {

  console.log('Cliente conectou');

});