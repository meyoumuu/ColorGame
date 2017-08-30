var numSquares = 6;
var colors = [];
var targetColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeBottons = document.querySelectorAll(".mode");

//initialize game
init();


function init(){
	setupMode();
	setupSquares();
	reset();
}

function setupMode(){
	for(var i = 0; i < modeBottons.length ; i++){
		modeBottons[i].addEventListener("click", function(){
			modeBottons[0].classList.remove("selected");
			modeBottons[1].classList.remove("selected");
			this.classList.add("selected");
			if(this.textContent === "Easy"){
				numSquares = 3;
			} else if (this.textContent === "Hard"){
				numSquares = 6;
			} else {
				numSquares = 9;
			}
			reset();
		});
	}	
}

function setupSquares(){
	//loop each element in the list of squares and assign color
	for(var i = 0; i < squares.length; i++){
		//add click listener to square 
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare answer 
			if(clickedColor === targetColor){
				//if correct 
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				displayCorrectColor(targetColor);
				h1.style.backgroundColor = targetColor;
			} else {
				messageDisplay.textContent = "Try Again!!";
				this.style.backgroundColor = "#232323";
			}	
		});
	}
}

function reset(){
	colors = generateRandomColors(numSquares);
	targetColor = pickColor();
	
	colorDisplay.textContent = targetColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	//change color or squares depends on the new color list
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "#232323";
}


resetButton.addEventListener("click", function(){
	reset();
});

//functions 

function displayCorrectColor(color){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var randomNum = Math.floor(Math.random() * colors.length);
	return colors[randomNum];
}

//create String that is random rgb
function pickRgb(){
	var randomR = Math.floor(Math.random() * 256);
	var randomG = Math.floor(Math.random() * 256);
	var randomB = Math.floor(Math.random() * 256);
	var rgb = "rgb(" + randomR + ", " + randomG + ", " + randomB + ")";
	return rgb;
}

//return array of random colors 
function generateRandomColors(num){
	var arr = [];
	for(var i = 0; i < num ; i++){
		arr.push(pickRgb());
	}
	return arr;
}

