
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const options = {};
const io = require('socket.io')(server, options);
const bodyParser = require("body-parser");

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
    socket.on('chat-message', (message) => {
        console.log(`Mensaje: ${message}`);
    });
});
