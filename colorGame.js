var numCircles = 6;
var colors = [];
var pickedColor;
var circles = document.querySelectorAll(".circle");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init(){
	setupModeButtons();
	setupCircles();
	reset();
}

function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
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
}

function removeSelect() {
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].classList.remove("selected");
	}
}

function setupCircles(){
	for(var i = 0; i < circles.length; i++){
	//add click listeners to circles
		circles[i].addEventListener("click", function(){
			//grab color of clicked circle
			var clickedColor = this.style.background;
			//compare color to pickedColor
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!!";
				resetButton.textContent = "Play Again?"
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			} else {
				this.style.background = document.querySelector("body").background;
				this.style.boxShadow = "";
				messageDisplay.textContent = "Try Again :("
			}
		});
	}
}



function reset(){
	colors = generateRandomColors(numCircles);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";
	//change colors of circles
	for(var i = 0; i < circles.length; i++){
		if(colors[i]){
			circles[i].style.display = "block"
			circles[i].style.background = colors[i];
		} else {
			circles[i].style.display = "none";
			circles[i].style.boxShadow = "";
		}
	}
	h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
})

function changeColors(color){
	//loop through all circles
	for(var i = 0; i < circles.length; i++){
		//change each color to match given color
		circles[i].style.background = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = []
	//repeat num times
	for(var i = 0; i < num; i++){
		//get random color and push into arr
		arr.push(randomColor())
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from  0 -255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from  0 -255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

