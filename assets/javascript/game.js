var game = {
    // variables
    words: ["allium","anemone","azalea","begonia","blackthorn","bloodroot",
            "bluebell","boronia","bottlebrush","camellias","cornflower",
            "cosmos","crocus","dahlia","daisy","freesia","gardenia","geranium",
            "hawthorn","hollyhock","jasmine","lilacs","lisianthus","magnolia",
            "poppy","rose","snowdrop","tulip","zinnia"],
    winTotal: 0,
    currentWord: "",
    currentGuessWord: "",
    totalGuess: 14,
    remainingGuess: 14,
    guessedLetters: [],
    guessedWords: [],
    winSound: "assets/sounds/win.mp3",
    loseSound: "assets/sounds/lose.mp3",

    // methods
    // randomly pick a word
    setCurrentWord: function() {
        var index = Math.floor(Math.random()*this.words.length);
        this.currentWord = this.words[index];
        console.log(this.currentWord);
        this.remainingGuess = this.totalGuess;
        this.guessedLetters = [];
    },

    // get the user's answer (correct letter + place holders ("-"))
    getCurrentGuessWord: function() {
        var word = "";
        for(var i=0;i<this.currentWord.length;i++){
            if(this.guessedLetters.indexOf(this.currentWord.charAt(i).toUpperCase()) != -1){
                word += this.currentWord.charAt(i);
            }else{
                word += "_";
            }
        }
        this.currentGuessWord = word;
        return word;
    },

    // save guessed letter to this.guessedLetters
    addGuessedLetter: function(letter){
        this.guessedLetters.push(letter);
    },

    //reset game when player wins or loses
    resetGame: function() {
        this.setCurrentWord();
        this.getCurrentGuessWord();
    },

    // play sound
    playSound: function(id,src) {
        var sound = document.getElementById(id);
        sound.setAttribute("src",src);
        sound.setAttribute("volume",0.1);
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none"; 
        sound.play();    
    },

    // print image
    printImage: function(id){
        document.getElementById(id).src="assets/images/"+this.currentWord+".jpg";
    },

    // print game's current status
    printStatus: function(win_id,word_id,remaining_id,guessletter_id){
        document.getElementById(win_id).innerHTML = this.winTotal;
        document.getElementById(word_id).innerHTML = this.currentGuessWord;
        document.getElementById(remaining_id).innerHTML = this.remainingGuess;
        document.getElementById(guessletter_id).innerHTML = this.guessedLetters;
    },

    // scroll down to buttom of element
    scrollDown: function(id){
        var element = document.getElementById(id);
        var topPos = element.offsetTop;
        element.scrollTop = topPos;
    },

    // print game's history
    appendHistory: function(isWin,elem_id) {
        //print guessed word
        var li_elem = document.createElement("li");
        li_elem.textContent = this.currentWord;
        document.getElementById("list").appendChild(li_elem);

        // print check mark
        var i_elem = document.createElement("i");
        li_elem.appendChild(i_elem);

        //set check mark class
        if(isWin){
            i_elem.setAttribute("class","far fa-check-circle win")
        }else{
            i_elem.setAttribute("class","far fa-times-circle lose")
        }
        this.scrollDown(elem_id);
    },

};


// var game = new game();
document.onkeyup = function(event) {
    if(game.currentWord == ""){
        // set the word then start the game
        game.setCurrentWord();
        document.getElementById("presskey").setAttribute("style","display:none");
    }else if((64 < event.keyCode && event.keyCode < 91) 
                && (game.guessedLetters.length == 0 
                    || game.guessedLetters.indexOf(event.key.toUpperCase()) == -1)){
        // save guessed letter
        game.addGuessedLetter(event.key.toUpperCase());
        game.remainingGuess--;
    }

    // get the current guess word (guessed (correct) letter + place holders)
    var current_guess_word = game.getCurrentGuessWord();

    // check if play wins or loses
    if(current_guess_word.indexOf("_") == -1){
        game.winTotal++;
        game.playSound("sound","assets/sounds/win.mp3");
        game.printImage("flowerimg");
        game.appendHistory(true,"history_window");
        game.resetGame();
    }else if(game.remainingGuess == 0){
        game.playSound("sound","assets/sounds/lose.mp3");
        game.appendHistory(false,"history_window");
        game.resetGame();
    }
    
    game.printStatus("win_num","word","guesses_num","guessed_letter");
 
    
}
