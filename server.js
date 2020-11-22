const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

io.on('connection', (socket) => {
socket.emit('connected');
socket.on('start', (room, user) => {
  socket.join(room);
  socket.to(room).emit('new user', user);
})
socket.on('chat', (room, user, msg) => {
    socket.to(room).emit('new chat', user, msg);
})
});




app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))


server.listen(port, () => {
  console.log('Server listening on port ' + port);
});
