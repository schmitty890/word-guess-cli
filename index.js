const Word = require('./Word.js');
const inquirer = require('inquirer');
const json = require("./words.json");
const randomWordNPM = require('random-word');

/**
 * [wordGuess holds all the functionality of the word guessing game]
 */
let wordGuess = ( () => {

    /**
     * [startRound starts a new round where the user is prompted if they want a question with a hint or no hint
     * (the words with a hint come from the words.json file, the words with no hint come from a random word using https://www.npmjs.com/package/random-word)]
     */
    startRound = () => {
        inquirer.prompt([{
            type: "list",
            name: "difficulty",
            message: "Would you like a word with a hint or no hint?",
            choices: ["hint", "no hint", "i'm done playing"]
        }]).then(resp => {
            let difficulty = resp.difficulty;
            switch (difficulty) {
                case 'hint':
                    whichCategory();
                    break;
                case 'no hint':
                    randomWordFromRandomWordNpm();
                    break;
                case "i'm done playing":
                    console.log('see ya!');
                    break;
            }
        });
    };

    /**
     * [whichCategory prompts the user to select a category of words they'd like to guess for from our words.json file]
     */
    whichCategory = () => {
        inquirer.prompt([{
            type: "list",
            name: "category",
            message: "Select a category!",
            choices: ["sports", "shapes", "food"]
        }]).then(resp => {
            let selection = resp.category;
            randomWordFromJson(selection);
        });
    };

    /**
     * [randomWordFromRandomWordNpm plays the game with a random word from random-word npm package]
     */
    randomWordFromRandomWordNpm = () => {
        let randomWord = randomWordNPM(),
            theWord = new Word(randomWord);
        theWord.newWord(randomWord);
        theWord.displayWord(randomWord);
        guessLetter(theWord);
    };

    /**
     * [randomWordFromJson gets a random word in the words.json file from the category the user has selected]
     */
    randomWordFromJson = (selection) => {
        let categoryLength = json.category[selection].length, // get the amount of words in the category the user has selected
            randomWord = Math.floor((Math.random() * categoryLength)), // get a random number between 0 and the number of words in the category selected
            chosenWord = json.category[selection][randomWord], // get a random word
            theWord = new Word(chosenWord.word); // construct a new word out of the chosen word in Word.js
        theWord.newWord(chosenWord.word); // start the new word
        theWord.displayWord(chosenWord.word); // display the word
        theWord.displayHint(chosenWord.hint); // display the hint
        guessLetter(theWord); // pass the word to guessLetter
    };

    /**
     * [guessLetter prompts the user to make a guess, checks if the letter guessed is in the word, displays a string
     * representation of the word, then checks if all of the letters in the word have been guessed]
     */
    guessLetter = (theWord) => {
        // console.log(theWord);
        inquirer.prompt([{ //prompt the user to guess a letter
            type: "input",
            name: "userGuess",
            message: "Guess a letter!"
        }]).then(resp => {
            let userGuess = resp.userGuess;
            let tries = theWord.tries;
            theWord.checkGuess(userGuess); //check if letter was guessed
            theWord.displayWord(theWord); //display the string representation
            theWord.lettersGuessedDisplay();
            let allGuessed = theWord.checkIfAllLettersAreGuessed(); // check if all letters have been guesed
            if (tries === 0 && allGuessed === false) { // if the no tries left and user has not the word correctly
                theWord.giveItUp(theWord);

                startRound();
            } else if (allGuessed) { // if all letters have been guessed
                startRound(); //start new round
            } else {
                guessLetter(theWord); // otherwise, keep guessing
            }
        });
    };

    /**
     * [init start round when wordGuess is initialized]
     */
    init = () => {
        startRound();
    };

    /**
     * return init so it can be called as wordGuess.init()
     */
    return {
        init: init
    }
})();

/**
 * initialize wordGuess
 */
wordGuess.init();