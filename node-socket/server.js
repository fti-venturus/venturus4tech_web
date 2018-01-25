
// Primeiro passo vamos ouvir somente o evento “connection”

var server = require('http').createServer(handler);
server.listen(3000);

var io = require('socket.io')(server);

function handler(req, res) {
  console.log("Recebemos um request");
  res.write('Hello World');
  res.end();
};

io.on('connection', function(client) {
  console.log('Client connected');
});

// Atualizar o client conectando no websocket e mostrar no Browser o Log,
// toda vez que o browser é atualizado, o cliente conecta novamente

var socket = io('http://localhost:3000');

// Próximo passo é enviar mensagens para o cliente usando o método emit()

io.on('connection', function(client) {
   console.log('Client connected');
   client.emit('messages', {message: "Hello World"});
});

// No cliente devemos atualizar para ouvir pelo evento de mensagem

socket.on('messages', function(data) {
  alert(data.message);
});

// Agora vamos enviar mensagens para o servidor quando o usuário
// digitar alguma mensagem e clicar no botão “Enviar”
// No servidor, podemos ouvir pelo evento mensagem

client.on('messages', function(message) {
  console.log(message);
});

// No cliente, devemos enviar a mensagem para o servidor quando clicar no botão Enviar

server.emit('messages', message);

// Agora podemos rodar a aplicação em varias abas para ver os logs no servidor

// Já sabemos como enviar mensagens do servidor para o cliente e vice-versa,
// mas como queremos criar uma aplicação de Chat, vamos ter muitos clientes
// conectados no servidor, e vamos precisar fazer o broadcasting das mensagens
// recebidas para todos os clientes

// Podemos usar o método io.emit() para enviar para todos os clientes

io.emit("messages", message);

// Vamos alterar o o cliente para atualizar a view quando receber mensagens

$('#messages').append($('<li>').text(data));

// Agora vamos testar a aplicação com 2 clientes diferente, podemos ver no log que
// ambos conectaram no chat e agora podemos ver quem está escrevendo qual mensagem

var server = require('http').createServer(handler);
var io = require('socket.io')(server);

server.listen(3000);

function handler(req, res) {
  console.log("Recebemos um request");
  res.write('Hello World');
  res.end();
}

io.on('connection', function(client) {
  console.log('Client connected');
  client.on('messages', function(message) {
    console.log(message);
    io.emit("messages", message);
  });
});

// Agora quando abrimos o Chat com um novo cliente, perceba que ele não vai
// ver nenhuma mensagem que já tinha sido enviada antes, o que podemos fazer
// para solucionar isso é criar um array de mensagens no servidor para guardar esse histórico

// Vamos criar o array de mensagens primeiro

var messages = [];

// Agora vamos criar um método saveMessage() que vai receber a mensagem e vai adicionar no array

var saveMessage = function(message) {
  messages.push(message);
}

// Agora, vamos adicionar a data e salvar a mensagem no array,
// logo após emitirmos a nova mensagem para todos os clientes

client.on('messages', function(message) {
  message.sent = new Date().toISOString();
  saveMessage(message);
  io.emit("messages", message);
});

// Agora precisamos mudar o connection listener para quando novos clientes entrarem
// na sala de chat, nós devemos enviar todas as mensagens do array para eles

messages.forEach(function(message) {
  client.emit("messages", message);
});

// Agora se testarmos no browser podemos ver que os
// clientes anteriores vão visualizar as mensagens antigas

// Porém, caso a gente decida reiniciar o servidor e entrar
// novamente no chat, vamos ver que perdemos todas as mensagens

// Portanto, como podemos persistir as mensagens mesmo que o servidor reinicie?
// Precisamos usar um banco de dados, e no nosso caso vamos usar o MongoDB

var server = require('http').createServer(handler);
var io = require('socket.io')(server);
server.listen(3000);

var messages = [];

var saveMessage = function(message) {
  messages.push(message);
};

function handler(req, res) {
  console.log("Recebemos um request");
  res.write('Hello World');
  res.end();
}

io.on('connection', function(client) {
  console.log('Client connected');
  messages.forEach(function(message) {
    client.emit("messages", message);
  });

  client.on('messages', function(message) {
    message.sent = new Date().toISOString();
    saveMessage(message);
    io.emit("messages", message);
  });
});