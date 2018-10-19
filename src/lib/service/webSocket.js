/**
 * Created by Holo on 2017/2/7.
 */

module.exports = {
    init
};

function init(server) {
    if (!server) return;

    let io = require('socket.io')(server);
    io.on('message', message => {

    });

    io.on('connection', socket => {
        console.log('a user connect...');

        socket.on('chat message', function (msg) {
            io.emit('chat message', msg);
        });

        socket.on('disconnect', () => {
            console.log('a user disconnect...');
        });
        socket.broadcast.emit('hi'); // except current socket
        socket.emit('notification', {}); // send to one
    });
    
    io.emit('something', {}); // send to all
}