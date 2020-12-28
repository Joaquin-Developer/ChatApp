
/**
 * Main.js 
 * Functions for index.html page
 * Last Update: 2020/12/27 - 06:15pm, by Joaquín Parrilla
 */

addEventListener("load", function() {
	/**
	 * This function define the username of this chat session
	 */
	let name = "";
	while (name === null || name.length === 0) {
		name = prompt("Ingresar nombre identificatorio en el chat: ", "");

		if(name === "")
			alert("Error: No indicó ningun nombre de identificación.");
	}
	sessionStorage.setItem("userName", name);
	alert(`¡Bienvenid@ a la sesión, ${name}!`);
	document.getElementById('h6-userInfo').innerHTML = `Tu username: ${name}`;

});

document.getElementById("btnSend").addEventListener("click", sendMessage);

document.getElementById("textBox").addEventListener("keypress", function(event) {
	if (event.keyCode === 13) sendMessage();

});

document.getElementById("clean").addEventListener("click", function() {
	cleanTextBox();
});

function cleanTextBox() {	
	document.getElementById('textBox').value = "";
}

function sendMessage() {
	const message = document.getElementById('textBox').value;

	if (message.length === 0) {
		alert("Debe ingresar un mensaje");
	} else {
		const msgElement = document.createElement("P");
		msgElement.appendChild(document.createTextNode(`${sessionStorage.getItem("userName")}: ${message}`));
		document.getElementById('messages').appendChild(msgElement);
		cleanTextBox();
	}
}

