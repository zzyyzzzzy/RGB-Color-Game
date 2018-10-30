//seletct all variables to be modified
var numCircles = 3;
var colors = [];
var pickedColor;
var circles = $(".circle");
var colorDisplay = $("#colorDisplay");
var messageDisplay = $("#message");
var h1 = $("h1");
var resetButton = $("#reset");
var modeButtons = $(".mode");
var dificulty = $("#dropdownMenu2");

init();


function init(){
	setupButtons();
	setupCircles();
	reset();
}

//setup buttons in dropdown menu
function setupButtons(){
	resetButton.on("click", function(){
		reset();
	});
	modeButtons.on("click", function(){
		modeButtons.removeClass("selected");
		this.classList.add("selected");
		if (this.textContent === "Easy") {
			numCircles = 3;
			dificulty.text("Easy");
		} else if (this.textContent === "Hard") {
			numCircles = 6;
			dificulty.text("Hard");
		} else {
			numCircles = 9;
			dificulty.text("Expert");
		}
		reset();
	});
}

//setup all circles to be displayed
function setupCircles(){
	circles.on("click", function(){
		var clickedColor = this.style.background;
		if(clickedColor === pickedColor){
			messageDisplay.text("Correct!!!");
			messageDisplay.css({color:pickedColor, fontSize:"125%", fontWeight:"bold"});
			resetButton.text("Play Again?");
			circles.css({background: clickedColor, boxShadow:"0 8px 6px -6px black"});
			h1.css({background: clickedColor});
		} else {
			this.style.background = $("body").css("background");
			this.style.boxShadow = "0 0px 0px -0px black";
			messageDisplay.text("Try Again :(");
		}
	});
}

//pick a new color and reset all the settings
function reset(){
	colors = generateRandomColors(numCircles);
	pickedColor = pickColor();
	colorDisplay.text(pickColor);
	resetButton.text("New Colors");
	messageDisplay.text("");
	messageDisplay.css({color:"black", fontSize:"100%", fontWeight:"normal"});
	for(var i = 0; i < circles.length; i++){
		if(colors[i]){
			circles[i].style.display = "block"
			circles[i].style.background = colors[i];
		} else {
			circles[i].style.display = "none";
		}
	}
	h1.css({background: "steelblue"});
}

//pick a color for user to gusses
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//generate random rgb colors depend on num
function generateRandomColors(num){
	var arr = []
	for(var i = 0; i < num; i++){
		arr.push(randomColor());
	}
	return arr;
}

//pick a random rgb color
function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

