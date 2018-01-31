
var http = require('http');

// cria o servidor e coloca o callback

var server = http.createServer(function(req, res) {
  res.setHeader('Content-type', 'text/plain; charset=utf-8');
  res.write('Versão final');
  res.end();
});

// põe o servidor para escutar a porta 3000 e o
// IP "0.0.0.0" abaixo serve para disponibilizar a
// aplicação para acesso remoto (de outra máquina)

server.listen(3000, '0.0.0.0', function() {
  console.log('Servidor ouvindo porta 3000');
});

var messages = []; // lista de mensagens

function saveMessage(message) {
  messages.push(message);
}

var io = require('socket.io')(server);

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
