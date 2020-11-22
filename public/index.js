const socket = io();
let user = '';
let room = '';
socket.on('connected',()=>{
})

socket.on('new user', (user) => {
  let chat = document.getElementById('chatBox');
  var newUser = document.createElement("P");
  newUser.innerHTML = user + " has joined the chat";
  chat.appendChild(newUser);
})

socket.on('new chat', (chatter, msg) => {
  let chat = document.getElementById('chatBox');
  var message = document.createElement("P");
  message.innerHTML = '<b>' + chatter + '</b>: ' + msg;
  chat.appendChild(message);
})


document.getElementById("button").addEventListener("click", getUser);


function getUser(){
  room = document.getElementById("room").value;
  document.getElementById("room").value = '';
  document.getElementById("room").placeholder = 'What do you want to say?'
  user = document.getElementById("name").value;
  document.getElementById("name").remove();
  document.getElementById("title").innerHTML = room;
  document.getElementById('button').innerHTML = 'Chat';
  document.getElementById('chat').id = 'chatBox';
  socket.emit('start', room, user);
  document.getElementById("button").removeEventListener("click", getUser);
  document.getElementById("button").addEventListener("click", sendChat);
}

function sendChat(){
  let msg = document.getElementById("room").value;
  document.getElementById("room").value = '';
  socket.emit('chat', room,  user, msg);
  let chat = document.getElementById('chatBox');
  var message = document.createElement("P");
  message.innerHTML = '<b>' + user + '</b>: ' + msg;
  message.classList.add('user');
  chat.appendChild(message);

}
