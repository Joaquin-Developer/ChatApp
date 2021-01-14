
const Message = require("./models/Message");

module.exports = function(io) {
    
    io.on('connection', async (socket) => {
        console.log(`Un usuario con id ${socket.id} se unió al chat`);
        addUser(socket.id);
        // let oldMessages = await Message.find({});
        // socket.emit("recover-old-messages", oldMessages);
    
        socket.on("chat-message", async function(message) {
            console.log(`Nuevo Mensaje de ${getUsername(socket.id)}: ${message}`);
            // const msg = new Message({
            //     username: socket.nickname,
            //     message: message
            // });
            // await msg.save();

            let msgData = { message: message, userName: getUsername(socket.id) };
            socket.broadcast.emit('send-message', msgData);
            socket.emit('send-message', msgData);
        });
    
        socket.on("set-username", function(username, cb) {

            if (setUsername(socket.id, username)) {
                cb(true);  // callback
                console.log(`El usuario de id ${socket.id} tiene el nombre de: ${username}`);
                socket.nickname = username;
                // console.log("Nickname: " + socket.nickname);
                setUsername(socket.id, username);
                socket.broadcast.emit('set-username', username);
                socket.emit('set-username', username);
            } else {
                console.log("ya hay un usuario con el username recibido: " + username);
                cb(false);
            }
        });

        socket.on("disconnect", function(data) {
            console.log(`El usuario con id ${socket.id} se desconectó.`);
            deleteUsername(socket.id);
            // mas adelente, debería notoficarle a cada usuario que un usuario se desconectó...
        });
    
    });
} // end module

// Chat and users LOGIC:

let allUsers = [];  // list of all users of chat

function addUser(id) {
    allUsers.push({
        id: id,
        userName: undefined
    });
    // allUsers.forEach(user => console.log(user));
}

function setUsername(id, userName) {
    // esto se puede optimizar!
    // primero, verifico que no existan otros usuarios con el mismo userName:
    for (let user of allUsers) {
        if (user.userName === userName) {
            return false;
        }
    }

    // luego, agrego el nombre de usuario:
    allUsers.forEach(user => {
        if (user.id === id) {
            user.userName = userName;
        } 
    });
    allUsers.forEach(user => console.log(user));
    return true;
}

function getUsername(id) {
    // esto también se puede optimizar!!
    for (let user of allUsers) {
        if (user.id === id) {
            return user.userName;
        }
    }
}

function deleteUsername(id) {
    for (let user of allUsers) {
        if (user.id === id) {
            allUsers.splice(allUsers.indexOf(user), 1);
        }
    }
    // volvemos a mostrar usuarios conectados por consola:
    if (allUsers.length === 0) console.log("Hay 0 usuarios conectados.");    
    else allUsers.forEach(user => console.log(user));
    
}

