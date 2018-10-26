var numCircles = 3;
var colors = [];
var pickedColor;
var circles = $(".circle");
var colorDisplay = $("#colorDisplay");
var messageDisplay = $("#message");
var h1 = $("h1");
var resetButton = $("#reset");
var modeButtons = $(".mode");


init();


function init(){
	setupModeButtons();
	setupCircles();
	reset();
}

function setupModeButtons(){
	modeButtons.on("click", function(){
		removeSelect();
		this.classList.add("selected");
		if (this.textContent === "Easy") {
			numCircles = 3;
		} else if (this.textContent === "Hard") {
			numCircles = 6;
		} else {
			numCircles = 9;
		}
		reset();
	});
}

function removeSelect() {
	modeButtons.removeClass("selected");
}

function setupCircles(){
	//add click listeners to circles
	circles.on("click", function(){
		//grab color of clicked circle
		var clickedColor = this.style.background;
		//compare color to pickedColor
		if(clickedColor === pickedColor){
			messageDisplay.text("Correct!!!");
			messageDisplay.css({color:pickedColor, fontSize:"125%", fontWeight:"bold"});
			resetButton.text("Play Again?");
			changeColors(clickedColor);
			h1.css({background: clickedColor});
		} else {
			this.style.background = $("body").css("background");
			this.style.boxShadow = "0 0px 0px -0px black";
			messageDisplay.text("Try Again :(");
		}
	});
}

function reset(){
	colors = generateRandomColors(numCircles);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.text(pickColor);
	resetButton.text("New Colors");
	messageDisplay.text("");
	messageDisplay.css({color:"black", fontSize:"100%", fontWeight:"normal"});
	//change colors of circles
	for(var i = 0; i < circles.length; i++){
		if(colors[i]){
			circles[i].style.display = "block"
			circles[i].style.background = colors[i];
		} else {
			circles[i].style.display = "none";
		}
	}
	h1.css({background: "steelblue"});
	resetButton.on("click", function(){
		reset();
	});
}

function changeColors(color){
	circles.css({background: color, boxShadow:"0 8px 6px -6px black"});
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr = []
	for(var i = 0; i < num; i++){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

