
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const options = {};
const io = require('socket.io')(server, options);
const bodyParser = require("body-parser");

let allUsers = [];

// settings:
app.set("port", 5000);
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

// middlewares:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes:
app.use(require("./routes/index"));

// static files:
app.use(express.static(__dirname + "/public"));

// listening the server:
app.listen(app.get("port"), function() {
    console.log("Server on port ", app.get("port"));
});

// socket

// io.on('connection', (socket) => {
//     console.log('a user connected');
// });

io.on('connection', (socket) => {

    console.log("Un usuario se unió al chat");
    addUser(socket.id);

    socket.on('chat-message', function(message) {
        console.log(`Nuevo Mensaje de ${socket.id}: ${message}`);
        let msgData = { message: message, userName: allUsers[socket.id]["userName"] };
        socket.broadcast.emit('send-message', msgData);
        socket.emit('send-message', msgData);
    });



});

function addUser(id) {
    allUsers.push({
        id: id,
        userName: ""
    });
}
