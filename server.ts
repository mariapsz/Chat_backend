import {PORT} from './config';
import {UsersHolder} from './UsersHolder';
import {Socket} from 'socket.io';

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(PORT);

app.get('/', function () {
    console.log('alo');
});

const usersHolder = new UsersHolder();

io.on('connection', (socket: Socket) => {
    socket.on('startChatting', () => {
        usersHolder.addUser({nick: '', sessionID: socket.client.id});
        //socket.
    });

    socket.on('disconnect', () => {
            usersHolder.removeUser(socket.client.id);
        }
    );
});


