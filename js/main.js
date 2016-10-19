//The following function takes a filepath as parameter and the content of the file is then added inside the body tag
//The place where the content is added is wherever this script was called in the document flow
//To use this function to get content to a html file, you write:
//<script>loadFromDoc(filepath)</script>
function loadFromDoc(filePath){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){
			var body = document.getElementsByTagName("body");
			body[0].innerHTML += this.responseText;
		}
	}
	xhttp.open("GET", filePath);
	xhttp.send();
}