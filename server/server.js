
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var port = 3000;

app.use(bodyParser.json());

app.listen(port, function(err) {
  if (!err) {
    console.log(`Servidor ouvindo porta ${port}.`);
  }
});

var messages = [];

app.get('/', function(req, res) {
  res.send('Olá mundo!');
});

app.get('/messages', function(req, res) {
  res.send(messages);
});

app.post('/messages', function(req, res) {
  var message = req.body;
  messages.push(message);
  res.send(message);
});