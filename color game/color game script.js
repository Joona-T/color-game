//Number of squares to be displayed. Depends on the selected mode.
var numberOfSquares = 6;
//Array of randomed colors in each game. 
var colors = [];
//The winning color.
var pickedColor;
//The colored squares.
var squares = document.querySelectorAll(".square");
//The span that shows the rgb of the pickedColor.
var colorDisplay = document.getElementById("colorDisplay");
//Informs whetever user clicked right or wrong color.
var messageDisplay = document.querySelector("#message");
//"The Great RGB Color Game" header.
var h1 = document.querySelector("h1");
//Button that resets the game.
var resetButton = document.querySelector("#reset");
//Buttons for selecting the dificulty mode.
var modeButtons = document.querySelectorAll(".mode");

init();

//Initialiser function for starting new game.
function init() {

    //Make dificulty buttons work.
    setupModeButton();
    
    //Make color squares work.
    setupSquares();

    //Resets the game, picks and sets new colors, chooses new winning color, changes the displayed rgb code. Makes extra squares invisible in case of easy mode.
    reset();
} //function init()

//Make mode(dificulty) buttons work by adding eventlisteners.
function setupModeButton() {
    //For loop for adding eventlisteners for each mode button (easy and hard in this case).
    for(var i = 0; i < modeButtons.length; i++) {
        //Let's add eventlistener for selected button.
        modeButtons[i].addEventListener("click", function() {
            //First let's remove selected class from both buttons (in case of changing mode or changig colors)
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            //Then let's add the selected mode for the right button.
            this.classList.add("selected");
            //If selected mode is easy, let's generate 3 color boxes.
            if(this.textContent === "Easy") {
                numberOfSquares = 3;
            }
            //In case of hard mode, let's generate 6 boxes.
            else {
                numberOfSquares = 6;
            }
            //Optional way to code:
            // this.textContent === "easy" ? numberOfSquares = 3: numberOfSquares = 6;
            
            //Let's reset the game.
            reset();
        }); //modeButtons[i].addEventListener
    } //for loop for mode buttons.
} //function setupModeButton()

//Make color squares responsive by adding eventlisteners.
function setupSquares() {
    //Loop for adding eventlisteners for each color square.
    for(var i = 0; i < squares.length; i++) {
        //Add click listeners to squares.
        squares[i].addEventListener("click", function() {      
            //Let's pick the color of the clicked square
            var clickedColor = this.style.backgroundColor;
            
            //Compare the clicked square color to winning color.
            //User clicks the right color:
            if(clickedColor === pickedColor) {
                //In case of right color, message correct.
                messageDisplay.textContent = "Correct!";
                //Change all box colors to the winning color.
                changeColors(clickedColor)
                //Change header background to winning color.
                h1.style.backgroundColor = clickedColor;
                //Insted of "new colors" let's ask if user wants to play again.
                resetButton.textContent = "Play Again?";
            }
            //User clicks the wrong color:
            else {
                //In case of wrong color, lets change the clicked square's color to match the body background color (turns invisible).
                this.style.backgroundColor = "#232323";
                //Advise user to try again.
                messageDisplay.textContent = "Try Again";
            }
        }); //squares[i].addEventListener
    } //for loop
} //function setupSquares()

//Resets the game, picks and sets new colors, chooses new winning color, changes the displayed rgb code. Makes extra squares invisible in case of easy mode.
function reset() {
    //Generates the array of random colors.
    //Number of squares is determined in setupModeButtons() function.
    colors = generateRandomColors(numberOfSquares);
    //Picks the winning color.
    pickedColor = pickColor();
    //Shows winning color's rgb value.
    colorDisplay.textContent = pickedColor;
    //Loops through the squares.
    for(var i = 0; i < squares.length; i++) {
        //If colors[i] = true (there is colors left), a square will be displayed and colored.
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        //If no colors are left, in case of easy mode, the remaining squares will be vanished.
        else {
            squares[i].style.display = "none";
        }
    }
    //The header color will be reseted to its original value.
    h1.style.backgroundColor = "steelblue";
    //Reset button's text will be reseted.
    resetButton.textContent = "New Colors";
    //The status message resets to nothing.
    messageDisplay.textContent = "";
} //reset()

//Make the reset button work by adding eventlistener, which runs reset() function.
resetButton.addEventListener("click", function(){
    reset();
});

//Function that changes all the suqres for given color.
function changeColors(color) {
    //Loop through all squares.
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

//Picks and returns the winning color by random from the generated color array.
function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

//Generates and returns an array of random colors. Tha amount of generated colors is determined by parameter num.
function generateRandomColors(num) {
    //Make an array
    var arr = [];
    //Repeat num times.
    for(var i = 0; i < num; i++) {
        //Get random color and push into array.
        arr.push(randomColor());
    }
    //Return ready array.
    return arr;
}

//Function for generating a random color. Returns the color in string format which is in comparable form.
function randomColor() {
    //Pick a "red" from 0-255
    //Math.random gives values from 0-255,99999
    //Math.floor rounds the value down: 255,99999 -> 255.
    var r = Math.floor(Math.random() * 256);
    //Pick a "green" from 0-255
    var g = Math.floor(Math.random() * 256);
    //Pick a "blue" from 0-255
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}

//REPLACED CODE:

// easyBtn.addEventListener("click", function(){
//     easyBtn.classList.add("selected");
//     hardBtn.classList.remove("selected");
//     numberOfSquares = 3;
//     colors = generateRandomColors(numberOfSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     for(var i = 0; i < squares.length; i++) {
//         if(colors[i]) {
//             squares[i].style.backgroundColor = colors[i];
//         }
//         else {
//             squares[i].style.display = "none";
//         }
//     }
// });

// hardBtn.addEventListener("click", function(){
//     hardBtn.classList.add("selected");
//     easyBtn.classList.remove("selected");
//     numberOfSquares = 6
//     colors = generateRandomColors(numberOfSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;
//     for(var i = 0; i < squares.length; i++) {
//         squares[i].style.backgroundColor = colors[i];
//         squares[i].style.display = "block";
//     }
// });