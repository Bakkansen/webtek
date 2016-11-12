console.log(1);

var radio = document.getElementsByClassName("radio");
radio[0].addEventListener("click", img1AndClear1);

radio[1].addEventListener("click", img2AndClear2);

radio[2].addEventListener("click", img3AndClear3);

function img1() {
	img = document.getElementById("1");
	img.src="images/sliderimage1.jpg";
	img.setAttribute("x", "2");
	console.log(4.1);
	rad = document.getElementsByClassName("radio");
	radio[0].checked = true;
}

function img1AndClear1(){
	img1();
	clearInterval(interval);
}

function img2AndClear2(){
	img2();
	clearInterval(interval);
}

function img3AndClear3(){
	img3();
	clearInterval(interval);
}

function img2() {
	img = document.getElementById("1");
	img.src="images/sliderimage2.jpg";
	img.setAttribute("x", "3");
	rad = document.getElementsByClassName("radio");
	radio[1].checked = true;
	console.log(4.2);
}

function img3() {
	img = document.getElementById("1");
	img.src="images/sliderimage3.jpg";
	img.setAttribute("x", "1");
	rad = document.getElementsByClassName("radio");
	radio[2].checked = true;
	console.log(4.3);
}

console.log(2);

interval = window.setInterval(nextImg,7000);

console.log(3);

function nextImg() {
	var currentImg=document.getElementById("1");
	if (currentImg.getAttribute("x")=="1") {
		img1();
	}

	else if (currentImg.getAttribute("x")=="2") {
		img2();
	}

	else{
		img3();
	}
}
