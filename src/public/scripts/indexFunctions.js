/**
 * index.html functions
 * JavaScript Vanilla :)
 */

const loadMessage = "Atención: Este sitio se encuentra actualmente en mantenimiento. Puede generarse alguna falla!"
const socket = io();
const txtMensaje = document.getElementById("txtMensaje");
const messagesList = document.getElementById("messagesList");

addEventListener("load", () => {
    alert(loadMessage);
});

document.querySelector("#btnLoginChat").addEventListener("click", (evt) => {
    evt.preventDefault();
    sendUsername();
});


function sendUsername() {
    const name = document.querySelector("#inputUsername").value;

    if (!name) {
        showAlert("error", "Error: No indicó ningun nombre de identificación.");
        return;
    }
    // console.log("Ok");
    socket.emit("set-username", name, data => {
        if (data) {
            sessionStorage.setItem("userName", name);
            showAlert("success", `¡Bienvenid@ a la sesión, ${sessionStorage.getItem("userName")}!`);
            showChat();
        } else {
            showAlert("error", "Error: Ya hay un usuario con el mismo nombre, eliga otro nombre!");
        }
    });

}

function showChat() {
    const chat = document.querySelector("#chatApp");
    showHtmlElement(chat);
    hideHtmlElement(document.querySelector("#formLoginChat"))
}

function showAlert(typeAlert, textAlert) {
    let alertElem = null;
    if (typeAlert === "error") {
        alertElem = document.querySelector("#errorAlert");
    } else if (typeAlert === "success") {
        alertElem = document.querySelector("#successAlert");
    } else { return; }

    if (alertElem.firstChild) { 
        alertElem.removeChild(alertElem.firstChild);
    }
    
    alertElem.appendChild(document.createTextNode(textAlert));
    showHtmlElement(alertElem);

    setTimeout(() => {
        hideHtmlElement(alertElem);
    }, 8000);

}

// show and hide html elements:
function showHtmlElement(element) {
    element.classList.remove("noVisible");
    element.classList.add("visible");
}

function hideHtmlElement(element) {
    element.classList.remove("visible");
    element.classList.add("noVisible");
}

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
        // addMessageInTextArea(message, sessionStorage.getItem("userName"));
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
});

// cargar mensajes anteriores al iniciar el chat:
socket.on("recover-old-messages", function(data) {
    for (let message of data) {
        addMessageInTextArea(message.message, message.username);
    }

});


function getActualDate() {
    const actualDate = new Date();
    let hours = actualDate.getHours();
    let minutes = actualDate.getMinutes();
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    return (hours + ":" + minutes);
}

