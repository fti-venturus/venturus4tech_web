
// importa o módulo do Express

var express = require('express');

// cria uma instância da aplicação

var app = express();

// insere rota padrão GET

app.get('/', function(req, res) {
  res.send('Rota padrão').end();
});

// insere rota GET de mensagens

app.get('/mensagens', function(req, res) {
  res.send('Get de mensagens').end();
});

// inicia escuta na porta 3000

app.listen(3000, function(err) {
  console.log('Servidor no ar');
});

