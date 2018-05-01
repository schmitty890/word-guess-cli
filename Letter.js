const Letter = function(letter) {
    this.letter = letter;
    this.guessed = false;
    this.stringRepresentation = (letter) => {
        if (letter.guessed === true) { // if the letter guessed property value is equal to true
            return this.letter.letter; // return the letter to display in the string representation
        } else {
            return '_'; // return the _ to display in the string representation
        }
    };
    this.hasLetterBeenGuessed = (letter) => {
        // console.log('Letter guessed: ' + letter + ' Letter: ' + this.letter);
        if (letter === this.letter) { // if the letter is equal to this letter
            this.guessed = true; // set this guessed to true
        }
    };
};

module.exports = Letter; // export Letter to use in Word.js