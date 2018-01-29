
// importa o módulo do Express

var express = require('express');
var bodyParser = require('body-parser');

// cria uma instância da aplicação

var app = express();
app.use(bodyParser.json());

// insere rota padrão GET

app.get('/', function(req, res) {
  res.send('Rota padrão').end();
});

// insere rota GET de mensagens

var messages = [];

app.get('/messages', function(req, res) {
  res.json(messages);
});

// insere rota POST de mensagens

app.post('/messages', function(req, res) {
  var message = req.body;
  messages.push(message);
  res.json(message);
});

// inicia escuta na porta 3000

app.listen(3000, function(err) {
  console.log('Servidor no ar');
});

