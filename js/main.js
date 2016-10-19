function loadHeader() {
	var ajax = new XMLHttpRequest();
	ajax.open("GET", "header.html", false);
	ajax.send();
	document.getElementById("header").innerHTML += ajax.resposeText;
}
