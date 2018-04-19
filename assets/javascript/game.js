
var flowers_array = ["allium","anemone","azalea","begonia","blackthorn","bloodroot","bluebell","boronia","bottlebrush","camellias","cornflower","cosmos","crocus","dahlia","daisy",
"freesia","gardenia","geranium","hawthorn","hollyhock","jasmine","lilacs","lisianthus","magnolia","poppy","rose","snowdrop","tulip","zinnia"];
var wins_num = 0;
var current_word = "";
var total_guess = 15;
var guesses_remaining = 0;
var guessed_letters = [];
var guessed_words = [];

// randomly pick a word
function setCurrentWord(){
    var index = Math.floor(Math.random()*flowers_array.length);
    current_word = flowers_array[index];
    console.log(current_word);
    guesses_remaining = total_guess;
    guessed_letters = [];
}

// get the current guess word (correct letter + place holders ("-"))
function getCurrentGuessWord(){
    var word = "";
    for(var i=0;i<current_word.length;i++){
        if(guessed_letters.indexOf(current_word.charAt(i).toUpperCase()) != -1){
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

function scrollDown(){
    var element = document.getElementById("history_window");
    var topPos = element.offsetTop;
    element.scrollTop = topPos;
}

// print game's history
function appendHistory(word,win) {
    //print guessed word
    var node = document.createElement("LI");
    node.textContent = word;
    document.getElementById("history").appendChild(node);

    // print check mark
    var i_node = document.createElement("I");
    li_elems = document.getElementsByTagName("li")
    li_elems[li_elems.length-1].appendChild(i_node);

    //set check mark class
    var i_elems = document.getElementsByTagName("i");
    var last_i = i_elems[i_elems.length-1];
    if(win){
        last_i.setAttribute("class","far fa-check-circle win")
    }else{
        last_i.setAttribute("class","far fa-times-circle lose")
    }
    scrollDown();
}

function playSound(id,src) {
    var sound = document.getElementById(id);
    sound.src = src;
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none"; 
    sound.play();
    
}

document.onkeyup = function(event) {
    // play presses any key to start the game
    if(current_word == ""){
        // set the word then start the game
        setCurrentWord();
    }else if((64 < event.keyCode && event.keyCode < 91) 
                && (guessed_letters.length == 0 || guessed_letters.indexOf(event.key.toUpperCase()) == -1)){
        // add guessed letter to guessed_letters array
        guessed_letters.push(event.key.toUpperCase());
        guesses_remaining--;
    }

    // get the current guess word (guessed (correct) letter + place holders)
    var current_guess_word = getCurrentGuessWord();

    // check if play wins or loses
    if(current_guess_word.indexOf("_") == -1){
        wins_num++;
        playSound("sound","assets/sounds/win.mp3");
        document.getElementById("flowerimg").src="assets/images/"+current_guess_word+".jpg";
        appendHistory(current_word,true);
        // alert("You won!");
        resetGame();
    }else if(guesses_remaining == 0){
        playSound("sound","assets/sounds/lose.mp3");
        appendHistory(current_word,false);
        // alert("You lost!");
        resetGame();
    }else{
        printStatus(current_guess_word);
    }
    
}
