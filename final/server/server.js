
var http = require('http');
var socket = require('socket.io');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// conecta com o banco de dados "vnt4tech"

mongoose.connect('mongodb://localhost:27017/vnt4tech');

// define schema do banco de dados

var MessageSchema = new Schema({
  message: String,
  author: String,
  time: {
    type: Date,
    default: new Date()
  }
});

// cria modelo no banco a partir do schema

var MessageModel = mongoose.model('messages', MessageSchema);

// cria o servidor com função de callback

var server = http.createServer((req, res) => {
  res.setHeader('Content-type', 'text/plain; charset=utf-8');
  res.write('Versão final');
  res.end();
});

// põe o servidor para escutar a porta 3000 e o
// IP "0.0.0.0" abaixo serve para disponibilizar a
// aplicação para acesso remoto (de outra máquina)

server.listen(3000, '0.0.0.0', (err) => {
  console.log('Servidor ouvindo porta 3000');
});

// define função para salvar mensagens
// message - objeto da mensagem enviada
// cb - função de callback

function saveMessage(message, cb) {

  var newMessage = new MessageModel();
  newMessage.time = message.time || new Date();
  newMessage.author = message.author || '';
  newMessage.message = message.message || '';

  newMessage.save((error) => {
    if (error) {
      console.error(error);
      cb(null);
    }
    else {
      cb(newMessage);
    }
  });
}

// inicia socket passando nosso server

var io = socket(server);

// configura o socket com eventos

io.on('connection', (client) => { // cliente conectou

  console.log('Cliente conectou');

  MessageModel.find({}, (error, messages) => {
    if (error) {
      console.error(error);
    }
    else {
      // envia todas as mensagens ao cliente
      client.emit('messages', messages);
    }
  });

  // cliente entrou no chat
  client.on('join', (nickname) => {
    console.log(`"${nickname}" entrou`);
    io.emit('join', nickname); // envia nickname para todos
  });

  // cliente enviou mensagem
  client.on('message', (message) => {
    console.log('Recebeu mensagem:');
    console.log(message);

    saveMessage(message, (newMessage) => {
      io.emit('message', newMessage); // envia mensagem para todos
    });
  });
});