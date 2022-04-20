const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {

    socket.on('new user', (usr) => {
        io.emit('new user', usr +" joined the chat");
    });


    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

  });

server.listen(3000, () => {
  console.log('listening on localhost:3000');
});