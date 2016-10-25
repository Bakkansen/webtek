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

//This function takes gives all elements of the same class the same border animation effect when
//someone hovers their mouse on said elements
function animateDivBorders(className, borderSize, color){
	//I get all the elements with class equal to the className parameter
	//anidivs is an array of all thye divs that are going to get animated
	var aniDivs = document.getElementsByClassName(className);
	
	//Itereting through each element in the aniDivs array and adding the animation effect to each element
	for (i = 0; i < aniDivs.length; i++){
		//Checking if the aniDiv has the right position attribute.
		//The code does not work properly on elements that cant act as anchors for absolutely positiones elements
		if (aniDivs[i].style.position != ("relative" || "absolute")){
			aniDivs[i].style.position = "relative";
		}
		
		//The animation will happen by changing the height or width of some new divs that are created by the code
		//This creates the divs that will make the border animation
		for (var t = 0; t < 4; t++){
			var newDiv = aniDivs[i].appendChild(document.createElement("div"));
			newDiv.className = "newDiv";
			newDiv.style.position = "absolute";
			newDiv.style.backgroundColor = color;
		}
		//adding event listeners
		aniDivs[i].addEventListener("mouseover", addBorder(aniDivs[i]));
		aniDivs[i].addEventListener("mouseout", removeBorder(aniDivs[i]));
		
		//styling the newly created divs
		var newDivs = aniDivs[i].getElementsByClassName("newDiv");
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
	}
}

//this is the function that runs when someone mouses over a specific element
function addBorder(elem){
	//first i make an array containing the element that fires the event, and all its children, grandchildren, etc
	var list = getChildren(elem);
	return function onMouseOver(event){
		//e is the element that the mouse was on before you moused over the elem element
		//https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget for more details
		var e = event.relatedTarget;
		//if you mouseover from one of elems children, the animation does not run
		if (list.indexOf(e) != -1){
			return;
		}
		//run the border animation
		var newDiv = this.getElementsByClassName("newDiv");
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
function removeBorder(elem){
	var list = getChildren(elem);
	return function onMouseOut(event){
		var e = event.relatedTarget;
		if (list.indexOf(e) != -1){
			return;
		}
		var newDiv = this.getElementsByClassName("newDiv");
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
//This causes problems with the css media queries, since the inline style overrides the media queries
//The following function uses media queries in javascript to fix the problem when inline style overrides the media queries in the css document
function navbarResize(){
	var nav = document.getElementsByTagName("nav")[0];
	if (window.matchMedia("(max-width: 1000px)").matches == false && window.getComputedStyle(nav,null).getPropertyValue("display") == "none"){
		nav.style.display = "block";
	}
}

//When the document is loaded, the event listeners are added where they are supposed to be
window.onload = function(){
	window.addEventListener("resize", navbarResize);
	document.getElementById("mobileButton").addEventListener("click", mobileButtonToggle);
	animateDivBorders("ani", "2px", "#a9a9a9")
}
