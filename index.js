const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Current user name 
let name = "";
// list of user
const users = []

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {

    socket.on('new user', (usr) => {
        name = usr
        if (users.includes(name)){
            console.log("username already exists")
            io.emit('err', "")
        } else {
            io.emit('new user', usr +" joined the chat");
            console.log(name + " is connected");
            users.push(usr)
        }
    });


    socket.on('chat message', (msg) => {
      io.emit('chat message', name +' : '+ msg);
    });

    socket.on('disconnect', () => {
        console.log(name + ' is disconnected');
    });

  });

server.listen(3000, () => {
  console.log('listening on localhost:3000');
});