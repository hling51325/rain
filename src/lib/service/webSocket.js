/**
 * Created by Holo on 2017/2/7.
 */

module.exports = {
    init
};

let users = []

function init(server) {
    if (!server) return;

    let io = require('socket.io')(server);
    io.on('message', message => {

    });

    io.on('connection', socket => {
        console.log('a user connect...');

        socket.on('chat-message', function (msg) {
            io.emit('chat-message', msg);
        });

        socket.on('user-connected', user => {
            const { username } = user
            let data = {
                socketId: socket.id,
                ...user
            }
            users.push(data)
            socket.broadcast.emit('user-connected', `${username} 加入了聊天室。`);
            socket.emit('users', users);
            socket.broadcast.emit('users', users);
        })

        socket.on('disconnect', () => {
            users = users.filter(user => user.socketId !== socket.id)
        });
        socket.broadcast.emit('hi'); // except current socket
        socket.emit('notification', {}); // send to one
    });

    io.emit('something', {}); // send to all
}