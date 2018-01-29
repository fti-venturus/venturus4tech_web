
function handler(req, res) {
  console.log("Recebeu request");
  res.write('Hello world!');
  res.end();
}

var server = require('http').createServer(handler);
server.listen(3000, '0.0.0.0', function() {
  console.log('Servidor ouvindo porta 3000');
});

var messages = [];
var io = require('socket.io')(server);

function saveMessage(message) {
  messages.push(message);
}

io.on('connection', function(client) {

  console.log('Cliente conectou');

  // envia todas as mensagens
  client.emit('messages', messages);

  client.on('join', function(nickname) {
    console.log(`"${nickname}" entrou`);
    io.emit('join', nickname); // emit to everyone
  });

  client.on('message', function(message) {
    console.log('Recebeu mensagem:');
    console.log(message);
    saveMessage(message);
    io.emit('message', message); // emit to everyone
  });
});