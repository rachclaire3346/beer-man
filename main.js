var restartButton = document.getElementById('restartButton');
var words = ['popcorn', 'penguin', 'lollipop', 'circus', 'ocean', 'reporter', 'pizzeria', 'dangerous', 'donkey', 'guarantee', 'costume', 'evacuate', 'volcano', 'unicorn', 'reptile', 'octopus', 'galactic', 'hypnotic', 'jigsaw', 'venus', 'eruption', 'emu'];
var wordPicked = '';
var wordList = document.getElementById('listLetters');
var letterGuessInput = document.getElementById('letterGuess');
var wrongGuesses = [];
var allGuesses = [];
var images = ['images/full-bar.png', 'images/lose-one.png', 'images/lose-two.png', 'images/lose-three.png', 'images/lose-four.png', 'images/lose-five.png', 'images/you-lost.png']
var wrongCount = 0;
var rightCount = 0;
var Heading = "";
var Message = '';


document.onreadystatechange = function() {
	
	if (document.readyState == "interactive") {
		restartButton.onclick = startGame;
		document.addEventListener("keypress", makeGuess);
		startGame();
	}
};

function startGame() {
	
	wordPicked = pickWord();
	//Clear out word list
	wordList.innerHTML = '';
	console.log(wordPicked);

	var wordLength = wordPicked.length;
	for (var i = 0; i < wordLength; i++) {
		wordList.appendChild(createListItem(i));
	}
	wrongCount = 0;
	wrongGuesses = [];
	displayWrongLetters();
	allGuesses = [];
	showImage();
	resetText ();
}

function pickWord() {
	 
	 var max = (words.length - 1);
	 var min = 0;
	 var randomIndex = Math.floor(Math.random() * (max - min) + min);
	 return words[randomIndex];

}

function createListItem(index) {

	var li = document.createElement("li");
	li.setAttribute("id", "item_" + index);
	li.setAttribute("class", "wordListItem");
 	return li;
}

function makeGuess(event) {
	// Grab everything by class name "wordlistItem" and put it into the array listItem
	var listItem = document.getElementsByClassName("wordListItem");
	// If the key you pressed is enter store the letter that was guessed into letterGuessValue
	if (event.key === 'Enter') {
		var letterGuessValue = letterGuessInput.value;
		var guessedCorrectly = false;
		letterGuessInput.value = '';
		//check to see if the guess has been made before
		if (allGuesses.includes(letterGuessValue) == false) {
			allGuesses.push(letterGuessValue);
			//Loop through word and check if letter is correct and display where it is
			for (var i = 0; i < wordPicked.length; i++) {
				if (letterGuessValue === wordPicked[i]) {
					listItem[i].innerHTML = letterGuessValue;
					guessedCorrectly = true;
					rightCount++;
					checkForWin();
					}
				}
			if (!guessedCorrectly) {
			
				wrongGuesses.push(letterGuessValue);
				wrongCount++;
				displayWrongLetters();
				showImage();

			}
		}
	}
}

function checkForWin() {
	var updateHeading = document.getElementById('heading');
	var updateMessage = document.getElementById('message');
	var winningHeading = "You've Won!"
	var winningMessage = "Let's play again! Click the New Game button."
	var winner = wordPicked.length;
	if (winner == rightCount) {
		updateHeading.innerHTML = winningHeading;
		updateMessage.innerHTML = winningMessage;
	}
}


function showImage() {
	var barPicture = document.getElementById('pictures');
	barPicture.setAttribute('src', images[wrongCount]);
	if (wrongCount > 6) {
		barPicture.setAttribute('src', images[6]);
	}
}

function displayWrongLetters () {
	var wrongLetters = document.getElementById('showWrongLetters');
	if (wrongGuesses.length <= 6)
		wrongLetters.innerHTML = wrongGuesses.join('  ');
	else (wrongGuesses.length > 6)
		var cutOff = wrongGuesses.slice(0, 6);
		wrongLetters.innerHTML = cutOff.join('  ');
}


//NEEDS SERIOUS WORK
function resetText () {
	var winningHeading = "Let's Play!";
	var winningMessage = "Guess my word correctly or lose your beer. Once you're out of beer the game is over.";
	updateHeading.innerHTML = winningHeading;
	updateMessage.innerHTML = winningMessage;
}












