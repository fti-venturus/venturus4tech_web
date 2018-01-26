
var server = require('http').createServer(handler);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

server.listen(3000);

mongoose.connect('mongodb://localhost:27017/chat4tech');

function handler(req, res) {
  res.type('text').send('Hello').end();
}

var messages = [];

var messageSchema = new Schema({
  message: String,
  author: String,
  time: {
    type: Date,
    default: Date.now
  }
});

var MessageModel = mongoose.model('messages', messageSchema);

var saveMessage = function(message) {

  var newMessage = new MessageModel();
  newMessage.author = message.author;
  newMessage.message = message.message;

  newMessage.save(function(error) {
    if (error) {
      console.error(error);
    }
    else {
      io.emit('messages', newMessage);
    }
  })
};

io.on('connection', function (client) {

  console.log('Client conectado!');

  MessageModel.find({}, function (error, messages) {
    if (error) {
      console.error(error);
    }
    else {
      messages.forEach(function(message) {
        client.emit('messages', message);
      });
    }
  });


  client.on('messages', function (message) {
    console.log(message);
    saveMessage(message);
  });

});