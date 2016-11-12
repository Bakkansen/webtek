var textAreaShown = false;

// Fades the text area in once an option is selected in the drop-down list.
function loadTextArea() {
	var textArea = document.getElementById("submission-area");
	if (!textAreaShown) {
		textArea.className = "fade-in";
		textAreaShown = true;
	}
}

// Fades the submission button in or out based on the value inside the text area by appending the propper css class
function loadSubmissionButton() {
	console.log("Function called");
	var button = document.getElementById("submit-button");
	var textArea = document.getElementById("submission-area");
	if (textArea.value != "") {
		button.className = "fade-in";
	} else {
		button.className = "fade-out";
	}
}
