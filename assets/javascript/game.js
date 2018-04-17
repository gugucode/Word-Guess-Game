
var flowers_array = ["bluebell","anemone","daisy","dahlia"];
var wins_num = 0;
var current_word = "";
var total_guess = 15;
var guesses_remaining = 0;
var guessed_letters = [];

// randomly pick a word, set current word
function setCurrentWord(){
    var index = Math.floor(Math.random()*flowers_array.length);
    current_word = flowers_array[index];
    console.log(current_word);
    guesses_remaining = total_guess;
    guessed_letters = [];
}

// get the current guess word (guessed (correct) letter + place holders ("-"))
function getCurrentGuessWord(){
    var word = "";
    for(var i=0;i<current_word.length;i++){
        if(guessed_letters.indexOf(current_word.charAt(i)) != -1){
            word += current_word.charAt(i);
        }else{
            word += "_";
        }
    }
    return word;
}

// print game's current status
function printStatus(current_guess_word){
    document.getElementById("win_num").innerHTML = wins_num;
    document.getElementById("word").innerHTML = current_guess_word;
    document.getElementById("guesses_num").innerHTML = guesses_remaining;
    document.getElementById("guessed_letter").innerHTML = guessed_letters;
}

//reset game when player wins or loses
function resetGame(){
    setCurrentWord();
    printStatus(getCurrentGuessWord());
}

document.onkeyup = function(event) {
    // play presses any key to start the game 
    if(current_word == ""){
        // set the word to start game
        setCurrentWord();
    }else if(guessed_letters.length == 0 || guessed_letters.indexOf(event.key) == -1){
        // add guessed letter to guessed_letters array
        guessed_letters.push(event.key);
        guesses_remaining--;
    }

    // get the current guess word (guessed (correct) letter + place holders)
    var current_guess_word = getCurrentGuessWord();

    // check if play wins or loses
    if(current_guess_word.indexOf("_") == -1){
        wins_num++;
        document.getElementById("flowerimg").src="assets/images/"+current_guess_word+".jpg";
        alert("You won!");
        resetGame();
    }else if(guesses_remaining == 0){
        alert("You lost!");
        resetGame();
    }else{
        printStatus(current_guess_word);
    }
    
}
