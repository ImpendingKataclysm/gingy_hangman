"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Word object constructor
var Word = function Word(word, hint) {
  _classCallCheck(this, Word);

  this.word = word;
  this.hint = hint;
}; // Hint/Word Arrays


var words = ["Duloc", "Lithgow", "Shrek", "Fiona", "Dragon", "Murphy", "Ogre"];
var hints = ["Fairy tale kingdom", "Tiny tyrant portrayer", "Unlikely hero", "Princess with inner beauty", "Fire-breathing ally", "Actor who made an ass of himself", "Green swamp dweller"]; // Keyboard Array

var keys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]; // DOM Elements

var $introPara = $("#intro");
var $outputPara = $("#output");
var $startBtn = $("#start-btn");
var $letters = $("#letters");
var $keyboard = $("#keyboard");
var $resultPara = $("#result");
var $gameOver = $("#game-over");
var $winGame = $("#win-game");
var $replayBtn = $("#replay");
var $newGameBtn = $("#new-game");
var $gameImage = $("#game-img"); // Keyboard display

var $letterKeys = [];
keys.forEach(function (oneKey) {
  var $letterKey = $(document.createElement("button"));
  $letterKey.text(oneKey);
  $keyboard.append($letterKey);
  $letterKeys.push($letterKey);
}); // Game Start

var chosenWord;
$startBtn.on("click", startGame);

function startGame() {
  console.log("button clicked"); // Random Number

  var rNum = Math.floor(Math.random() * words.length);
  console.log(rNum); // New Word object

  chosenWord = new Word(words[rNum], hints[rNum]);
  console.log(chosenWord);
  $outputPara.text(chosenWord.hint); // Spaces for letters

  var wordLetters = chosenWord.word.toUpperCase();
  var spaces;

  for (var i = 0; i < wordLetters.length; i++) {
    var $letterSpace = $(document.createElement("div"));
    $letterSpace.addClass("letter-space");
    $letters.append($letterSpace);
    spaces = document.querySelectorAll(".letter-space");
  }

  var spaceArr = Array.from(spaces);
  console.log(spaceArr); // Check whether letter is correct and respond

  var wrongGuesses = 0;
  var maxGuesses = 6;
  var answerCorrect;
  var currentImageNumber = 0;
  var animOn = false;
  $letterKeys.forEach(function (oneLetter) {
    oneLetter.on("click", checkLetter);
  });

  function checkLetter() {
    var injure;
    var thisLetter = this.textContent;
    var thisIndex = wordLetters.indexOf(thisLetter);
    console.log(thisLetter);

    if (thisIndex == -1) {
      console.log("letter not found");
      $resultPara.html("Nope. Try again!");
      wrongGuesses++;
      console.log(wrongGuesses);
      answerCorrect = false;
      animOn = true;
      injure = requestAnimationFrame(changeImg);
      console.log(currentImageNumber);
    } else {
      var allIndices = [];

      while (thisIndex != -1) {
        allIndices.push(thisIndex);
        thisIndex = wordLetters.indexOf(thisLetter, thisIndex + 1);
      }

      allIndices.forEach(function (oneIndex) {
        spaceArr[oneIndex].textContent = wordLetters[oneIndex];
        console.log(spaceArr[oneIndex].textContent);
      });
      $resultPara.html("Well done! Keep going!");
      console.log("".concat(wordLetters));
      answerCorrect = true;
    } // End screen display


    this.setAttribute("disabled", "disabled");

    if (wrongGuesses > maxGuesses) {
      console.log("Game over!");
      $gameOver.show();
      $replayBtn.on("click", restartGame);
      disableLetters();
      $gameImage.attr("src", "images/gingy012.png");
    }

    if ($letters.text() == chosenWord.word.toUpperCase()) {
      console.log("You win!");
      $winGame.show();
      $newGameBtn.on("click", restartGame);
      disableLetters();
    }
  }

  function changeImg() {
    setTimeout(function () {
      console.log("image changing");
      currentImageNumber++;

      if (currentImageNumber > 12) {
        currentImageNumber = 12;
        animOn = false;
      }

      $gameImage.attr("src", "images/gingy0".concat(currentImageNumber, ".png"));

      if (animOn == true) {
        animOn = false;
        injure = requestAnimationFrame(changeImg);
      }
    }, 100);
  } // Disable letter keys after they are clicked


  function disableLetters() {
    $letterKeys.forEach(function (oneKey) {
      oneKey.attr("disabled", true);
    });
  } // Hide Start button and intro paragraph while game in progress


  $startBtn.hide();
  $introPara.hide();

  function restartGame() {
    $gameOver.hide();
    $winGame.hide();
    $letters.html('');
    $outputPara.html("");
    $resultPara.html("");
    $introPara.show();
    $startBtn.show();
    $gameImage.attr("src", "images/gingy00.png");
    $letterKeys.forEach(function (oneKey) {
      oneKey.attr("disabled", false);
      oneKey.off("click", checkLetter);
    });
  }
}
//# sourceMappingURL=script.dev.js.map
