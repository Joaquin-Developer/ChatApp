
module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log(`Un usuario con id ${socket.id} se unió al chat`);
        addUser(socket.id);
    
        socket.on("chat-message", function(message) {
            console.log(`Nuevo Mensaje de ${socket.id}: ${message}`);
            let msgData = { message: message, userName: getUsername(socket.id) };
            socket.broadcast.emit('send-message', msgData);
            socket.emit('send-message', msgData);
        });
    
        socket.on("set-username", function(username) {
            console.log(`El usuario de id ${socket.id} tiene el nombre de: ${username}`);
            setUsername(socket.id, username);
            socket.broadcast.emit('set-username', username);
            socket.emit('set-username', username);
        });
    
    });
}

// Chat and users LOGIC:

let allUsers = [];  // list of users of chat

function addUser(id) {
    allUsers.push({
        id: id,
        userName: undefined
    });
    allUsers.forEach(user => console.log(user));
}

function setUsername(id, userName) {
    // esto se puede optimizar!
    allUsers.forEach(user => {
        if (user.id === id) {
            user.userName = userName;
            break;
        } 
    });

}

function getUsername(id) {
    // esto también se puede optimizar!!
    allUsers.forEach(user => {
        if (user.id === id) {
            return user.userName;
        } 
    });
}

