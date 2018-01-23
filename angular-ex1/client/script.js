
function sendMessage() {

  // obtém referência do elemento de mensagem
  var elemMessage = document.getElementById("message");

  // pega o valor digitado
  var message = elemMessage.value;

  // se a mensagem for vazia, avisa o usuário e retorna
  if (message === '') {
    alert('Digite uma mensagem!');
    return;
  }

  // cria objeto com a data e hora atuais
  var time = formatTime(new Date());

  // adiciona um novo item na lista de mensagens

  var li = document.createElement('li');
  li.innerHTML = message;

  var div = document.createElement('div');
  div.className = 'time';
  div.innerHTML = time;

  li.appendChild(div);

  document.getElementById("messageList").appendChild(li);

  elemMessage.value = ''; // apaga o conteúdo da textarea
  elemMessage.focus(); // coloca o foco na textarea

  updateCounter();
}

function keyUp(e) {

  updateCounter();

  // se digitou apenas Enter, manda a mensagem,
  // se apertou Shift também, não faz nada diferente,
  // ou seja, apenas pula a linha

  if (e.code === 'Enter' && !e.shiftKey) {
    sendMessage();
    return false;
  }
}

function formatTime(date) {

  // essa função apenas retorna a hora com o formato 08:30 AM

  var hour = date.getHours();
  var minutes = date.getMinutes();
  var period = hour > 11 ? 'PM' : 'AM';

  return hour + ':' + minutes + ' ' + period;
}

function updateCounter() {
  var charCount = document.getElementById("message").value.length;
  document.getElementById("charCounter").innerHTML = charCount + "/500"; 
}