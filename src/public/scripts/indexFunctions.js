/**
 * index.html functions
 */

const socket = io("http://localhost:5000"); // socket.io importado en index.html
const txtMensaje = document.getElementById("txtMensaje");
const messagesList = document.getElementById("messagesList");

addEventListener("load", function() {
    // console.log("Hola");
    // hacer algunas cositas mas aquí ... (sesionStorage)
    let name = "";
	while (name === null || name.length === 0) {
		name = prompt("Ingresar nombre identificatorio en el chat: ", "");

		if(name === "")
			alert("Error: No indicó ningun nombre de identificación.");
	}
    sessionStorage.setItem("userName", name);
    socket.emit("set-username", sessionStorage.getItem("userName"));
	alert(`¡Bienvenid@ a la sesión, ${name}!`);
});

document.getElementById("acercaDe").addEventListener("click", function() {
    alert("Aun no programé esta sección...");
});

document.getElementById("btnSend").addEventListener("click", sendMessage);

txtMensaje.addEventListener("keypress", function(event) {
    // usuario presiona enter
	if (event.keyCode === 13) sendMessage(); 
});

function sendMessage() {
    const message = txtMensaje.value;

	if (message.length === 0) {
		alert("Debe ingresar un mensaje");
	} else {
        socket.emit("chat-message", message);
        addMessageInTextArea(message, sessionStorage.getItem("userName"));
	}

}

function addMessageInTextArea(message, userName) 
{
    let textMessage;
    if (sessionStorage.getItem("userName") === userName) {
        // yo envié el mensaje
        textMessage = `Yo a las ${getActualDate()} >> ${message} \n`;
    } else {
        // otro usuario envió el mensaje
        textMessage = `${userName} a las ${getActualDate()} >> ${message} \n`;
    }
    messagesList.value += textMessage;
    // ajusto scroll al final:
    messagesList.scrollTop = messagesList.scrollHeight;
	cleanTextBox();
}

const cleanTextBox = () => txtMensaje.value = "";

// escucha de nuevos mensajes
socket.on('send-message', function(data) {
    
    addMessageInTextArea(data.message, data.userName);

    // const message = `${data.userName} : `;

});


function getActualDate() {
    const actualDate = new Date();
    let hours = actualDate.getHours();
    let minutes = actualDate.getMinutes();
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    return (hours + ":" + minutes);
}

