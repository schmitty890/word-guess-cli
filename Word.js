const chalk = require('chalk');
const log = console.log;
const Letter = require('./Letter.js');

const Word = function(theWord) {
    this.letters = []; // array of letters to hold letter objects representing the letters of the underlying word
    this.lettersGuessed = [];
    this.lettersGuessedDisplay = () => {
        // console.log('you have already guessed' + this.lettersGuessed);
        log(chalk.white(`You have guessed: `) + chalk.white.bold.bgBlackBright(`${this.lettersGuessed}`));
    };
    this.giveItUp = (theWord) => {
        var str = '';
        this.letters.forEach((element) => {
            str += element.letter;
        });
        log(chalk.red.bold(`the correct word was: ${str}`));
    };
    this.displayWord = (theWord) => { // display a string representation of the word
        let string = ''; // create empty string to display
        this.letters.forEach((letter) => {
            let theLetter = new Letter(letter);
            theLetter = theLetter.stringRepresentation(letter);
            string += theLetter;
        });
        log(chalk.white.bold(`Guess this word: `) + chalk.black.bgWhiteBright(`${string}`)); // log the string representation
    };
    this.displayHint = (theHint) => { // display the hint
        log(chalk.yellow(`Hint: ${theHint}`));
    };
    this.tries = 10;
    this.newWord = (theWord) => { // start a new word, add the letters to this.letters array
        this.letters = []; // empty this.letters array for new word
        for (let i = 0; i < theWord.length; i++) { // each letter in the word
            let letter = theWord[i];
            let theLetter = new Letter(letter);
            this.letters.push(theLetter); // push the new letter to this.letters
        }
    };
    this.checkGuess = (userGuess) => {
        let correct = false;
        if (this.lettersGuessed.includes(userGuess)) {
            log(chalk.red(`hey you guessed `) + chalk.yellow.underline(`${userGuess}`) + chalk.red(` already, guess another letter.`));
        } else {
            this.lettersGuessed.push(userGuess);

            this.letters.forEach((letter) => {
                let check = new Letter(letter.letter); //create check letiable
                check.hasLetterBeenGuessed(userGuess); // check if the letter has been guessed in Letter.hasLetterBeenGuessed
                if (check.guessed === true) { // if check.guessed is set to true by Letter.js
                    letter.guessed = true; // set this letter in the this.letters array to true
                    correct = true;
                    log(chalk.green(`Correct!!!`));
                }
            });

            if (correct === false) {
                log(chalk.red(`Incorrect! you have `) + chalk.yellow.underline(`${this.tries}`) + chalk.red(` attempts left.`));
                this.tries--;
            }
        }

    };
    this.checkIfAllLettersAreGuessed = () => {
        for (let i = 0; i < this.letters.length; i++) {
            if (this.letters[i].guessed === false) {
                return false; // break out of the loop and return value as false
            }
        }
        return true; // return value of true as all letters have been guessed
    };
};

module.exports = Word; // export Word to use in index.js