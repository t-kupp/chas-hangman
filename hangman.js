const words = ["apple", "banana", "grape", "orange", "peach", "melon", "pear", "plum", "kiwi", "mango", "blue", "green", "red", "pink", "black", "white", "purple", "brown", "yellow", "gray", "cat", "dog", "fish", "bird", "horse", "duck", "cow", "pig", "lion", "bear", "chair", "table", "desk", "bed", "couch", "shelf", "lamp", "door", "floor", "wall", "car", "bike", "truck", "bus", "train", "boat", "plane", "ship", "taxi", "tram", "sun", "moon", "star", "cloud", "rain", "snow", "wind", "fog", "storm", "sky", "book", "pen", "pencil", "paper", "glue", "tape", "paint", "crayon", "ruler", "eraser", "house", "home", "yard", "roof", "room", "garage", "window", "kitchen", "bathroom", "hall", "hat", "shirt", "pants", "sock", "shoe", "coat", "dress", "skirt", "scarf", "belt", "ant", "bee", "bat", "frog", "deer", "seal", "worm", "fly", "hawk", "owl"];
const maxGuesses = 6;
let wrongGuesses = 0;
let guessedCharacters = [];

// Welcome message
alert("You are playing Hangman! Guess the word before you run out of guesses.");

// Randomly select a word
const selectedWord = words[Math.floor(Math.random() * words.length)];

// Array that contains the selected word as hidden characters
let hiddenWord = [];
for (let i = 0; i < selectedWord.length; i++) {
  hiddenWord.push("_");
}

// Start the game loop
while (wrongGuesses < maxGuesses) {
  let guess;

  // Prompt the user for a guess and check its validity. Prompt for a new guess if invalid.
  do {
    guess = prompt(`Your word is: ${hiddenWord.join(" ")}\nYou guessed: ${guessedCharacters.join(" ")}\n\nGuess a character:`).toLowerCase();
    console.log(guess);

    // Check user guess validity
    if (!checkGuess(guess)) {
      alert("Invalid guess. Your guess must be a single letter.");
    } else if (!checkGuessDuplicate(guess)) {
      alert(`You guessed ${guess} already!`);
    }
  } while (!checkGuess(guess) || !checkGuessDuplicate(guess));

  // Save users guess to an array
  guessedCharacters.push(guess);

  // Check if guess is correct and change hiddenWord[...]
  if (selectedWord.includes(guess)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] == guess) {
        hiddenWord[i] = guess;
      }
    }
    // Win condition! The user wins if the hiddenWord array no longer contains "_" characters
    if (!hiddenWord.includes("_")) {
      alert(`Congratulations, you won! The word was: ${selectedWord}`);
      break;
    } else {
      alert(`You guessed right! Your word is: ${hiddenWord.join(" ")}`);
    }
  } else {
    // Increase wrong guesses if the guess was incorrect
    wrongGuesses++;
    // Lose condition! The user loses if they guessed wrong too many times.
    if (wrongGuesses == maxGuesses) {
      alert(`You have guessed wrong! (${wrongGuesses}/${maxGuesses})\nGame over.\nThe word was: ${selectedWord}`);
      break;
    } else {
      alert(`You have guessed wrong! (${wrongGuesses}/${maxGuesses})`);
    }
  }
}

// Helper functions
function checkGuess(input) {
  return input.length == 1 && typeof input == "string";
}

function checkGuessDuplicate(input) {
  return !guessedCharacters.includes(input);
}
