var att = [];
function loadFromDoc(filePath){
	var xhttp = new XMLHttpRequest();
	var scriptTag = document.getElementsByTagName("script");
	var newTag = [];
	for (var i = 0; i < scriptTag.length; i++){
		if (scriptTag[i].parentNode.nodeName != "HEAD"){
			newTag.push(scriptTag[i]);
		}
	}
	scriptElem = newTag[newTag.length - 1];
	scriptElem.setAttribute("scriptcount", newTag.length);
	att.push('<script scriptcount="' + newTag.length + '"');
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){
			var pattern = new RegExp(att[0]);
			var body = document.getElementsByTagName("body");
			var strIndex = pattern.exec(body[0].innerHTML);
			console.log(str = body[0].innerHTML.slice(0, strIndex.index));
			console.log(this.responseText);
			console.log(body[0].innerHTML.slice(strIndex, body[0].length));
			str = body[0].innerHTML.slice(0, strIndex.index) + this.responseText + body[0].innerHTML.slice(strIndex.index, body[0].length);
			body[0].innerHTML = str;
			console.log(str);
			att.shift();
		}
	}
	xhttp.open("GET", filePath);
	xhttp.send();
}