/**
 * index.html functions
 */

const txtMensaje = document.getElementById("txtMensaje");
const messagesList = document.getElementById("messagesList");

addEventListener("load", function() {
    // console.log("Hola");
    // hacer algunas cositas mas aquí ...
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
		// const msgElement = document.createElement("P");
		// msgElement.appendChild(document.createTextNode(`${sessionStorage.getItem("userName")}: ${message}`));
        // document.getElementById('messages').appendChild(msgElement);

        messagesList.value += (message + "\n");
        // ajusto scroll al final:
        messagesList.scrollTop = messagesList.scrollHeight;
		cleanTextBox();
	}

}

function cleanTextBox() {	
	txtMensaje.value = "";
}

