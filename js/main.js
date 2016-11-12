//Includes from link, removes include attribute and calls include(). Seperated from include() due to asynchronous nature of xmlhttprequests
function includeReady(elements, includeRequest) {
    elements.removeAttribute("include");
    elements.innerHTML = includeRequest.responseText;
		var arr = elements.getElementsByTagName("script")
		for (var n = 0; n < arr.length; n++) {
    	eval(arr[n].innerHTML)
			console.log(arr[n].innerHTML)
		}
    include();
    includeRequest = null;
}

//Makes xmlhttprequest, runs through all elements in the dom until it comes to a div with the include="link here" attribute and then removes that attribute, includes from link and calls itself.
function include() {
	var allElements;
	var fileName;
	var includeRequest;
	
  allElements = document.getElementsByTagName("*");
  for (var i = 0; i < allElements.length; i++) {
		
    if (allElements[i].getAttribute("include")) {
      var element = allElements[i];
			
      fileName = allElements[i].getAttribute("include");
      includeRequest = new XMLHttpRequest();
			includeRequest.open("GET", fileName, true);
			
      includeRequest.onreadystatechange = function() {
        if (includeRequest.readyState == 4 && includeRequest.status == 200) {
          
					return includeReady(element, includeRequest);
        }
      }     
			includeRequest.send();
  		
			return;	
    }
  }
}

//This function takes an element as input, and returns an array containing said element, its children, grandchildren etc
function getChildren(elem){
	children = [];
	holder = [];
	holder.push(elem);
	while (holder.length > 0){
		var elem = holder.pop();
		children.push(elem);
		for (var i = 0; i < elem.children.length; i++){
			holder.push(elem.children[i]);
		}
	}
	return children;
}

//This function makes elements animateable
//aniElem is the element that should get animated
//hoverElem is the element that triggers animation on mouseover or mouseout
//WARNING: the element that gets animated needs to be able to act as an anchor for a absolutely positioned element
function animateBorders(aniElem, hoverElem, borderSize, color){
	//warning if aniElem is not an anchor
	if (window.getComputedStyle(aniElem, null).getPropertyValue("position") != ("relative" || "absolute")){
		console.log("WARNING: the animated element does not act as an anchor")
	}
	
	for (var t = 0; t < 4; t++){
		var newDiv = aniElem.appendChild(document.createElement("div"));
		newDiv.className = "newDiv";
		newDiv.style.position = "absolute";
		newDiv.style.backgroundColor = color;
	}
	
	//styling the newly created divs
	var newDivs = aniElem.getElementsByClassName("newDiv");
	newDivs[0].style.top = "0";
	newDivs[0].style.right = "0";
	newDivs[0].style.width = borderSize;
	newDivs[0].style.height = "0%";
	
	newDivs[1].style.top = "0";
	newDivs[1].style.left = "0";
	newDivs[1].style.width = "0%";
	newDivs[1].style.height = borderSize;
	
	newDivs[2].style.bottom = "0";
	newDivs[2].style.right = "0";
	newDivs[2].style.width = "0%";
	newDivs[2].style.height = borderSize;

	newDivs[3].style.bottom = "0";
	newDivs[3].style.left = "0";
	newDivs[3].style.width = borderSize;
	newDivs[3].style.height = "0%";
	
	//adding event listeners
	hoverElem.addEventListener("mouseover", addBorder(aniElem, hoverElem));
	hoverElem.addEventListener("mouseout", removeBorder(aniElem, hoverElem));	
}

//this is the function that runs when someone mouses over a specific element
function addBorder(aniElem, hoverElem){
	//first i make an array containing the element that fires the event, and all its children, grandchildren, etc
	var list = getChildren(hoverElem);
	return function onMouseOver(event){
		//e is the element that the mouse was on before you moused over the elem element
		//https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget for more details
		var e = event.relatedTarget;
		//if you mouseover from one of elems children, the animation does not run
		if (list.indexOf(e) != -1){
			return;
		}
		//run the border animation
		var newDiv = aniElem.getElementsByClassName("newDiv");
		var x = 0;
		var id = setInterval(frame, 1);
		function frame(){
			if (x == 100){
				clearInterval(id);
			}
			else {
				x += 2;
				xString = String(x);
				newDiv[0].style.height = xString + "%";
				newDiv[1].style.width = xString + "%";
				newDiv[2].style.width = xString + "%";
				newDiv[3].style.height = xString + "%";
			}		
		}
	};
}

//This function is nearly identical to addBorder, except the reverse animation
function removeBorder(aniElem, hoverElem){
	var list = getChildren(hoverElem);
	return function onMouseOut(event){
		var e = event.relatedTarget;
		if (list.indexOf(e) != -1){
			return;
		}
		var newDiv = aniElem.getElementsByClassName("newDiv");
		var x = 100;
		var id = setInterval(frame, 1);
		function frame(){
			if (x == 0){
				clearInterval(id);
			}
			else{
				x -= 2;
				xString = String(x);
				newDiv[0].style.height = xString + "%";
				newDiv[1].style.width = xString + "%";
				newDiv[2].style.width = xString + "%";
				newDiv[3].style.height = xString + "%";			
			}
		}
	};
}

//This function toggles the menu when in mobile mode
function mobileButtonToggle(){
	var nav = document.getElementsByTagName("nav")[0];
	//When the document first loads the style is defined in an external style sheet.
	//Because of that i cannot use element.style.display to get the display style
	//To solve this I use getComputedStyle to make sure I get the nav display style even if it is from an external style sheet
	var displayStyle = window.getComputedStyle(nav, null).getPropertyValue("display")
	if (displayStyle == "none"){
		nav.style.display = "block";
	}
	else if (displayStyle == "block"){
		nav.style.display = "none";
	}
	else{
		console.log("Something has gone horribly wrong with the mobileButtonToggle");
	}
}

//When i change the style of any element with javascript, the element whos style i change gets inline style added to its html
//This causes problems with the css media queries, if the navbar has inline style display:none, the inline style overrides the external sheet
//This function makes the navbar visible on resize when the screen is big enough
function navbarResize(){
	var nav = document.getElementsByTagName("nav")[0];
	if (window.matchMedia("(max-width: 768px)").matches == false && window.getComputedStyle(nav,null).getPropertyValue("display") == "none"){
		nav.style.display = "block";
	}
}

//wait for html to load before executing
function initNav() {
	
	
		window.addEventListener("resize", navbarResize);
		document.getElementById("mobileButton").addEventListener("click", mobileButtonToggle);
		aniList = document.getElementsByClassName("ani");
		hoverList = document.getElementsByClassName("navlink");
		//make sure that animation does not get added at mobile device
		if (window.matchMedia("(max-width: 768px)").matches == false){
			for (var i = 0; i < aniList.length; i++){
				animateBorders(aniList[i], hoverList[i], "2px", "#D9D9D9");
			}
		}

}
