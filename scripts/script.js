
// Word object constructor
class Word {
    constructor(word, hint) {
        this.word = word;
        this.hint = hint;
    }
}

// Hint/Word Arrays
const words = [`Duloc`, `Lithgow`, `Shrek`, `Fiona`, `Dragon`, `Murphy`,
`Ogre`];
const hints = [
    `Fairy tale kingdom`,
    `Tiny tyrant portrayer`,
    `Unlikely hero`,
    `Princess with inner beauty`,
    `Fire-breathing ally`,
    `Actor who made an ass of himself`,
    `Green swamp dweller`
];

// Keyboard Array
const keys = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`,
`N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`, `V`, `W`, `X`, `Y`, `Z`];

// DOM Elements
const $introPara = $("#intro");
const $outputPara = $("#output");
const $startBtn = $("#start-btn");
const $letters = $("#letters");
const $keyboard = $("#keyboard");
const $resultPara = $("#result");
const $gameOver = $("#game-over");
const $winGame = $("#win-game");
const $replayBtn = $("#replay");
const $newGameBtn = $("#new-game");
const $gameImage = $("#game-img");


// Keyboard display
const $letterKeys = [];

keys.forEach( function(oneKey) {
    const $letterKey = $(document.createElement("button"));
    $letterKey.text(oneKey);
    $keyboard.append($letterKey); 
    $letterKeys.push($letterKey);
});

// Game Start
let chosenWord;

$startBtn.on("click", startGame);

function startGame() {
    console.log(`button clicked`);
    // Random Number
    let rNum = Math.floor(Math.random() * words.length);
    console.log(rNum);

    // New Word object
    chosenWord = new Word(words[rNum], hints[rNum]);
    console.log(chosenWord);
    $outputPara.text(chosenWord.hint);

    // Spaces for letters
    const wordLetters = chosenWord.word.toUpperCase();
    let spaces;

    for (let i = 0; i < wordLetters.length; i++) {
        const $letterSpace = $(document.createElement("div"));
        $letterSpace.addClass("letter-space");
        $letters.append($letterSpace);
        spaces = document.querySelectorAll(".letter-space");
    }

    const spaceArr = Array.from(spaces);

    console.log(spaceArr);

    // Check whether letter is correct and respond
    let wrongGuesses = 0;
    let maxGuesses = 6;

    let answerCorrect;
    let currentImageNumber = 0;
    let animOn = false;

    $letterKeys.forEach(function(oneLetter) {
        oneLetter.on("click", checkLetter);
    });

    function checkLetter() {
        let injure;
        let thisLetter = this.textContent;
        let thisIndex = wordLetters.indexOf(thisLetter);

        console.log(thisLetter);
        if (thisIndex == -1) {
            console.log(`letter not found`);
            $resultPara.html(`Nope. Try again!`);
            wrongGuesses++;
            console.log(wrongGuesses);

            answerCorrect = false;
            animOn = true;

            injure = requestAnimationFrame(changeImg);
            console.log(currentImageNumber);
        } else {
            let allIndices = [];
            while (thisIndex != -1) {
                allIndices.push(thisIndex);
                thisIndex = wordLetters.indexOf(thisLetter, thisIndex + 1);
            }

            allIndices.forEach( function(oneIndex) {
                spaceArr[oneIndex].textContent = wordLetters[oneIndex];
                console.log(spaceArr[oneIndex].textContent);
            });

            $resultPara.html(`Well done! Keep going!`);
            console.log(`${wordLetters}`);

            answerCorrect = true;
        }

        // End screen display
        this.setAttribute("disabled", "disabled");
        
        if (wrongGuesses > maxGuesses) {
            console.log(`Game over!`)
            $gameOver.show();
            $replayBtn.on("click", restartGame);
            disableLetters();
            $gameImage.attr("src", `images/gingy012.png`);
        }
       
        if ($letters.text() == chosenWord.word.toUpperCase()) {
            console.log(`You win!`);
            $winGame.show();
            $newGameBtn.on("click", restartGame);
            disableLetters();
        }
    }

    function changeImg() {
        setTimeout(function() {
            console.log(`image changing`);
            currentImageNumber++;

            if (currentImageNumber > 12) {
                currentImageNumber = 12;
                animOn = false;
            }

            $gameImage.attr(`src`, `images/gingy0${currentImageNumber}.png`);
            
            if (animOn == true) {
                animOn = false;
                injure = requestAnimationFrame(changeImg);
            } 

        }, 100);
    }

    // Disable letter keys after they are clicked
    function disableLetters() {
        $letterKeys.forEach(function(oneKey) {
            oneKey.attr("disabled", true);
        });
    }

    // Hide Start button and intro paragraph while game in progress
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

        $gameImage.attr("src", `images/gingy00.png`);

        $letterKeys.forEach(function(oneKey) {
            oneKey.attr("disabled", false);
            oneKey.off("click", checkLetter);
        });
    }
}