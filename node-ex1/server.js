
var http = require('http');

var server = http.createServer(callback);

function callback(req, res) {
  console.log('Recebemos um request');
  res.write('Hello world!');
  res.end();
}

server.listen(3000); // porta 3000

