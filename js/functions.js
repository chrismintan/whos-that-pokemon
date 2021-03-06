
var poke = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetchd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];
var currentPokeNum;
var pastPokemons = [];
var oneTo151 = [];
var currentType = [];
var currentName;
var currentPokemonURL;
var shuffledPokemons = [];
var currentImg;
var currentForeverScore = 0;
var bestForeverScore = 0;
var currentTimedScore = 0;
var bestTimedScore = 0;
var typed;
var middle = document.getElementById("middle");
var foreverScore = document.getElementById("forever-current-score");
var foreverBest = document.getElementById("forever-best-score");
var timedScore = document.getElementById("timed-current-score");
var timedBest = document.getElementById("timed-best-score");
var canvas = document.getElementById("myCanvas");
var namesArray = [];
var imgArray = [];
var typeArray = [];
var seconds = 60;
var turn;
var difficulty = 0;
var gameMode = 0;
var pokedex = {};
var easyArray = [];
var skip = 0;
var restart = 0;
var sound = 0;
var skipCounter = 0;
var wordsArray = [];
var currentKeys = [];
var intervalID;
var bottom = document.getElementById("blinker1");
var mid = document.getElementsByClassName("middle")[0];
var spelling = 0;


var addSound = function(src) {
    if ( sound != 1 ) {
        sound = 1;
        backgroundMusic = document.createElement("audio");
        backgroundMusic.id = "myMusic";
        backgroundMusic.src = src;
        backgroundMusic.setAttribute("preload", "auto");
        backgroundMusic.setAttribute("controls", "none");
        backgroundMusic.style.display = "none";
        middle.appendChild(backgroundMusic);
        backgroundMusic.play();
        document.getElementById("myMusic").loop = true;
        document.getElementById('myMusic').muted = false;
        document.getElementById('mute').style.display = 'table-cell'
    };
};


// Mute function for people who dont want to hear the awesome music
var mute = function() {
    if(document.getElementById('myMusic').muted == false) {
        document.getElementById('myMusic').muted = true;
        document.getElementById('mute').style.backgroundColor = '#FF4136';
        document.getElementById('mute').style.textDecoration = 'line-through';
    } else {
        document.getElementById('myMusic').muted = false;
        document.getElementById('mute').style.backgroundColor = 'transparent';
        document.getElementById('mute').style.textDecoration = 'none';
    }
}

document.getElementById('mute').addEventListener('click', mute)

// Generate an array of all the pokemons
for (var i = 1; i < 152; i++) {
    oneTo151.push(i);
    allPokemons = oneTo151;
};

// Generate a Pokedex of Pokemons corresponding to their id numbers (for speed mode)
for( var i = 0, j = 0; i < poke.length; i++, j++ ) {
    pokedex[allPokemons[i]] = poke[i];
};

for (var i = 0; i < shuffledPokemons.length; i++) {
	easyArray.push(pokedex[shuffledPokemons[i]]);
};

// Setting up buttons for difficulty and game modes
var easyButton = document.getElementById("easy");
var mediumButton = document.getElementById("medium");
var hardButton = document.getElementById("hard");
var skipButton = document.getElementById("skip");
var foreverButton = document.getElementById("forever");
var timedButton = document.getElementById("timed");
var startButton = document.getElementById("start-button");
var restartButton = document.getElementById("restart");

// Setting up variable for progress-bar
var progressBar = document.getElementById("progressBar");
var counter = document.getElementById("progress");

// Functions to change difficulty
var changeEasy = function() {
    difficulty = 1;
    easyButton.style.backgroundColor = "#f2d468";
    mediumButton.style.backgroundColor = "transparent";
    hardButton.style.backgroundColor = "transparent";
    easyButton.style.textDecoration = "line-through";
    mediumButton.style.textDecoration = "line-through";
    hardButton.style.textDecoration = "line-through";
    easyButton.style.textDecoration = "none";
};

var changeMedium = function() {
    difficulty = 2;
    easyButton.style.backgroundColor = "transparent";
    mediumButton.style.backgroundColor = "#f2d468";
    hardButton.style.backgroundColor = "transparent";
    easyButton.style.textDecoration = "line-through";
    mediumButton.style.textDecoration = "line-through";
    hardButton.style.textDecoration = "line-through";
    mediumButton.style.textDecoration = "none";
    // getPokemon();
};

var changeHard = function() {
    difficulty = 3;
    easyButton.style.backgroundColor = "transparent";
    mediumButton.style.backgroundColor = "transparent";
    hardButton.style.backgroundColor = "#f2d468";
    mediumButton.style.textDecoration = "line-through";
    hardButton.style.textDecoration = "line-through";
    easyButton.style.textDecoration = "line-through";
    hardButton.style.textDecoration = "none";
    // getPokemon();
};

var foreverMode = function() {
    gameMode = 1;
    foreverButton.style.backgroundColor = "#f2d468";
    timedButton.style.backgroundColor = "transparent";
    timedButton.style.textDecoration = 'line-through';
    foreverButton.style.textDecoration = 'none';
};

var timedMode = function() {
	gameMode = 2;
    foreverButton.style.backgroundColor = "transparent";
    timedButton.style.backgroundColor = "#f2d468";
    foreverButton.style.textDecoration = 'line-through';
    timedButton.style.textDecoration = 'none';
}

var skipMode = function() {
    skip = 1;
    skipCounter++
    if ( difficulty == 2 )  {
        document.getElementById("name-input").value = pokedex[shuffledPokemons[0]];
        if ( gameMode == 1 ) {
            currentForeverScore--
        };

        if ( gameMode == 2 ) {
            currentTimedScore--
        };
        nameCheck();
    };

    if ( difficulty == 3 ) {
        document.getElementById("name-input").value = pokedex[shuffledPokemons[0]];
        document.getElementById("type-input").value = pokemon.pokemon[shuffledPokemons[0] - 1].type[0];
        if ( gameMode == 1  ) {
            currentForeverScore--
        };

        if ( gameMode == 2 ) {
            currentTimedScore--
        };
        nameCheck();
    };

    if ( difficulty == 1 ) {
        document.getElementById("name-input").value = pokedex[shuffledPokemons[0]];
        if ( gameMode == 1 ) {
            currentForeverScore--
        };

        if ( gameMode == 2 ) {
            currentTimedScore--
        };
        nameCheck();
    };
    skip = 0;
};

var three21 = 3;
var countingDown = 3;

var threeToOne = function() {
    document.getElementById("progress").textContent = three21;
    three21--
};

// Function to remove all event listeners and cursor change
var removeAllListeners = function() {
    easyButton.removeEventListener("click", changeEasy);
    mediumButton.removeEventListener("click", changeMedium);
    hardButton.removeEventListener("click", changeHard);
    startButton.removeEventListener("click", gameDelay);
    foreverButton.removeEventListener("click", foreverMode);
    timedButton.removeEventListener("click", timedMode);

    easyButton.style.cursor = "default";
    mediumButton.style.cursor = "default";
    hardButton.style.cursor = "default";
    foreverButton.style.cursor = "default";
    timedButton.style.cursor = "default";
    startButton.style.cursor = "default";
};

var restartGame = function() {
    skipCounter = 0;
    if ( restart == 1 ) {
        for (var i = 1; i < 152; i++) {
            oneTo151.push(i);
            allPokemons = oneTo151;
        };
        clearCanvas();
        currentForeverScore = 0;
        currentTimedScore = 0;
        progress.textContent = "";
        gameMode = 0;
        difficulty = 0;
        setUpListeners();
        update();
        shuffle();
        updateBar();
        imgArray = [];
        namesArray = [];
        typeArray = [];
        seconds = 60;
        three21 = 3;
        gameMode = 0;
        difficulty = 0;
        restart = 0;
        easyButton.style.backgroundColor = "transparent";
        mediumButton.style.backgroundColor = "transparent";
        hardButton.style.backgroundColor = "transparent";
        foreverButton.style.backgroundColor = "transparent";
        timedButton.style.backgroundColor = "transparent";

        easyButton.style.textDecoration = "none";
        mediumButton.style.textDecoration = "none";
        hardButton.style.textDecoration = "none";
        foreverButton.style.textDecoration = "none";
        timedButton.style.textDecoration = "none";
    };
};

var gameInit = function() {
    rm = document.getElementById("type-input");
    nmbar = document.getElementById("name-input");
    if ( gameMode == 1 ) {
        if ( difficulty == 3 ) {
            progress.textContent = "0/151";
            rm.style.display = "block";
            nmbar.style.display = "inline";
            drawShadow();
        };
        if ( difficulty == 1 ) {
            drawShadow();
            progress.textContent = "0/151";
            rm.style.display = "none";
            nmbar.style.display = "inline";
        };
        if ( difficulty == 2 ) {
            drawShadow();
            progress.textContent = "0/151";
            rm.style.display = "none";
            nmbar.style.display = "inline";
        };
        removeAllListeners();
    };
    if ( gameMode == 2 ) {
        if ( difficulty == 3 ) {
        	rm.style.display = "block";
            nmbar.style.display = "inline";
        	startTimedGame();
        	drawShadow();
        	progress.textContent = seconds;
        };
        if ( difficulty == 1 ) {
            drawShadow();
            progress.textContent = seconds;
            startTimedGame();
            rm.style.display = "none";
            nmbar.style.display = "inline";
        };
        if ( difficulty == 2 ) {
            drawShadow()
            progress.textContent = seconds;
            startTimedGame();
            rm.style.display = "none";
            nmbar.style.display = "inline";
        };
    };
};

// Delaying gameInit due to wait for JSON data. 3 secs should be fiune
var gameDelay = function() {
    removeAllListeners()
    if ( restart == 0 ) {
        addSound("music/theme.mp3");
        if ( gameMode != 0 ){
            setTimeout(gameInit, 4100);
            setTimeout(threeToOne, 1000);
            setTimeout(threeToOne, 2000);
            setTimeout(threeToOne, 3000);
            restart = 1;
        };
    };
};

// Adding event listeners to the difficulty selectors
var setUpListeners = function() {
    easyButton.addEventListener("click", changeEasy);
    mediumButton.addEventListener("click", changeMedium);
    hardButton.addEventListener("click", changeHard);
    foreverButton.addEventListener("click", foreverMode);
    timedButton.addEventListener("click", timedMode);
    skipButton.addEventListener("click", skipMode);
    startButton.addEventListener("click", gameDelay);
    restartButton.addEventListener("click",restartGame);

    easyButton.style.cursor = "pointer";
    mediumButton.style.cursor = "pointer";
    hardButton.style.cursor = "pointer";
    foreverButton.style.cursor = "pointer";
    timedButton.style.cursor = "pointer";
    startButton.style.cursor = "pointer";

    easyButton.style.backgroundColor = "";
    mediumButton.style.backgroundColor = "";
    hardButton.style.backgroundColor = "";
    foreverButton.style.backgroundColor = "";
    timedButton.style.backgroundColor = "";
    startButton.style.backgroundColor = "";
};

// Progress bar manipulation for forever mode
var updateBar = function() {
    if ( gameMode == 1 ) {
        var percentage = parseInt(currentForeverScore) / 151;
        percentage = percentage * 100;
        progressBar.style.width = percentage + "%";
        progress.textContent = currentForeverScore + "/151" + "  Pokemon Skipped: " + skipCounter;
    };

    if ( gameMode == 2 ) {
    	oneDP = parseInt(seconds) + 1;
    	oneDP = oneDP * 60;
    	oneDP = Math.floor(oneDP);
    	oneDP = oneDP / 60;
    	progress.textContent = oneDP;
        timeLeft = parseInt(seconds);
        percentage = (seconds/60)*100;
        progressBar.style.width = percentage + "%";
        if ( seconds < 0 ) {
            clearCanvas();
        };
    };
};

// Function to set up / updating scores
var update = function() {
    foreverScore.textContent = currentForeverScore;
    foreverBest.textContent = bestForeverScore;
    timedScore.textContent = currentTimedScore;
    timedBest.textContent = bestTimedScore;
    updateBar();
};
//var tt = [];
// Records the Pokemon's Name into nameArray, type into typeArray & image url into imgArray
var responseHandler = function() {
	results = JSON.parse(this.responseText);

    if ( results.name != undefined ) {
        namesArray.push(results.name);
    };

    tempArr = [];
    if ( results.types != undefined ){
        if ( results.types.length < 2) {
            typeArray.push( [results.types[0].type.name] );
        } else if ( results.types.length > 1 ) {
            for ( var i = 0; i < 2; i++ ) {
                tempArr.push( results.types[i].type.name );
            } typeArray.push( tempArr );
        };
    };

    // JSON Version - was too lag to be played
    // if ( difficulty == 1 ) {

    //     if ( results.id > 0 && results.id <10 ) {
    //     imgArray.push("https://assets.pokemon.com/assets/cms2/img/pokedex/full/00" + results.id + ".png");


    //     };
    //     if ( results.id > 9 && results.id < 100 ) {
    //     imgArray.push("https://assets.pokemon.com/assets/cms2/img/pokedex/full/0" + results.id + ".png");

    //     };
    //     if ( results.id > 99 ) {
    //     imgArray.push("https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + results.id + ".png");
    //     };
    // };

    if ( difficulty == 2 || difficulty == 3 ) {
        if ( results.sprites.front_default != undefined ){
            imgArray.push(results.sprites.front_default);
        };
    };
};

// Shuffling the order of Pokemons being shown
var shuffle = function() {
    shuffledPokemons = [];
	for (var i = 150; i > -1; i--) {
		rNum = Math.floor( Math.random()*i );
		shuffledPokemons.push(oneTo151[rNum]);
        oneTo151.splice(rNum,1);
	}
};

// Function to get a random Pokemon from the remaining Pokemons
var getPokemon = function() {
    for ( var i = 0; i < 8; i++ ) {
        var request = new XMLHttpRequest();
        request.addEventListener("load", responseHandler);
    	request.open("GET", "https://pokeapi.co/api/v2/pokemon/" + shuffledPokemons[0] + "/");
    	request.send();
        // Removing Pokemons which data we already have searched for
        shuffledPokemons.shift(1,1);
    };
};

/*
var getInAdvance = function() {
    if ( nameArray.length < 4 )
    for ( var i = 4; i < 8; i++ ) {
        request.addEventListener("load", responseHandler);
        request.open("GET", "http://pokeapi.co/api/v2/pokemon/" + shuffledPokemons[i] + "/");
        request.send();
    };
};
*/

// Legacy version
/*
var setUpGame = function() {
	currentName = currentPokemonData.name;
	if ( currentPokemonData.types.length < 2 ) {
		currentType.push(currentPokemonData.types[0].type.name);
	};
	if ( currentPokemonData.types.length > 2 ) {
		for (var i = 0; i < currentPokemonData.types[0].type.length; i++) {
			currentType.push(currentPokemonData.types[0].type[i]);
		};
	};
	currentImg = currentPokemonData.sprites.front_default;
};
*/

/*
 	Function: drawShadow
	Makes all pixels of the image that is on the <canvas> black.

    Other difficulties ideas - use clearer image (try from official Pokemon website)
	Pikachu from official Pokemon site for testing
	"https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
*/

var drawShadow = function() {
	if ( difficulty != 1 ) {
		var canvas = document.getElementById("myCanvas")
		ctx = canvas.getContext("2d");
		shownImage = new Image();
		shownImage.src = "sprites/" + shuffledPokemons[0] + ".png";
		shownImage.setAttribute("crossorigin","Anonymous");

		// onload is used to ensure image has has finished loading
		shownImage.onload = function() {
        // If dealing with small images, use below to make them bigger
        // if ( shownImage.width <= 100 ) {
        // 	canvas.width = shownImage.width * 4;
        // 	canvas.height = shownImage.height * 4;
        // } else {
        // 	canvas.width = shownImage.width;
        // 	canvas.height = shownImage.height;
        // };

			ctx.drawImage(shownImage, 0, 0, canvas.width, canvas.height);
			var baseImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
			for (var i = 0; i < baseImage.data.length; i+=4 ) {
	            if( baseImage.data[i] >= 1 || baseImage.data[i+1] >= 1 || baseImage.data[i+2] >= 1)  {
	                baseImage.data[i] = 0;
	                baseImage.data[i+1] = 0;
	                baseImage.data[i+2] = 0;
	                // baseImage.data[i+3] = 255;
                };
            };
            ctx.putImageData( baseImage, 0, 0 );
    	};
    };

	// Local images don't work
	if ( difficulty == 1 ) {
		var canvas = document.getElementById("myCanvas")
		ctx = canvas.getContext("2d");
		shownImage = new Image();
		shownImage.src = "sprites/" + shuffledPokemons[0] + ".png";
		shownImage.setAttribute("crossorigin","Anonymous");

		// onload is used to ensure image has has finished loading
		shownImage.onload = function() {
    			// if ( shownImage.width <= 100 ) {
    			// 	canvas.width = shownImage.width * 4;
    			// 	canvas.height = shownImage.height * 4;
    			// } else {
    			// 	canvas.width = shownImage.width;
    			// 	canvas.height = shownImage.height;
    			// };

			ctx.drawImage(shownImage, 0, 0, canvas.width, canvas.height);
			var baseImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // avg used for greyscale
			for (var i = 0; i < baseImage.data.length; i+=4 ) {
	            if( baseImage.data[i] >= 1 || baseImage.data[i+1] >= 1 || baseImage.data[i+2] >= 1) {
                    var avg = (baseImage.data[i] + baseImage.data[i+1] + baseImage.data[i+2])/3
	                baseImage.data[i] = avg;
	                baseImage.data[i+1] = avg;
	                baseImage.data[i+2] = avg;
	                // baseImage.data[i+3] = 255;
    	        };
    		};
    		ctx.putImageData( baseImage, 0, 0 );
        };
	};
};


var revealPokemon = function() {
	if ( difficulty != 1 ) {
		var canvas = document.getElementById("myCanvas");
		ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		shownImage = new Image();
		shownImage.src = "sprites/"+shuffledPokemons[0]+".png";

	    shownImage.onload = function() {
	    if ( shownImage.width <= 100 ) {
	        canvas.width = shownImage.width * 4;
	        canvas.height = shownImage.height * 4;
	    } else {
	        canvas.width = shownImage.width;
	        canvas.height = shownImage.height;
	    }
	    ctx.drawImage(shownImage, 0, 0, canvas.width, canvas.height);
	    };
	};
	if ( difficulty == 1 ) {
		var canvas = document.getElementById("myCanvas");
		ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		shownImage = new Image();
		shownImage.src = "sprites/"+shuffledPokemons[0]+".png";

	    shownImage.onload = function() {
	    if ( shownImage.width <= 100 ) {
	        canvas.width = shownImage.width * 4;
	        canvas.height = shownImage.height * 4;
	    } else {
	        canvas.width = shownImage.width;
	        canvas.height = shownImage.height;
	    }
	    ctx.drawImage(shownImage, 0, 0, canvas.width, canvas.height);
	    };
	};
};

var clearCanvas = function() {
    cxt = canvas.getContext("2d");
    cxt.clearRect(0, 0, canvas.width, canvas.height);
};

var clearInputFields = function() {
    document.getElementById("name-input").value = "";
    document.getElementById("type-input").value = "";
};

var clearAndDraw = function() {
    clearCanvas();
    drawShadow();
    clearInputFields();
};

// Function  for checking the name of the Pokemon
var nameCheck = function() {

    if ( spelling == 1 ) {

        if ( difficulty == 1 || difficulty == 2 ) {
            let input = document.getElementById("name-input").value.toLowerCase();
            let answer = pokedex[shuffledPokemons[0]].toLowerCase();

            if ( (wordDiff(input, answer) < 3 && wordDiff(input, answer) != false) || input == answer ) {
                revealPokemon()
                if ( gameMode == 1 ) {
                    currentForeverScore++
                    if ( currentForeverScore > bestForeverScore && skip == 0 ) {
                        bestForeverScore = currentForeverScore;
                    };
                };

                if ( gameMode == 2 ) {
                    currentTimedScore++
                    if ( currentTimedScore > bestTimedScore && skip == 0 ) {
                        bestTimedScore = currentTimedScore;
                    };
                };

                update();
                shuffledPokemons.shift(1,1);
                setTimeout(clearAndDraw, 1000);
            }

        } else if ( difficulty == 3 ) {
            let input1 = document.getElementById("name-input").value.toLowerCase();

            let answer1 = pokedex[shuffledPokemons[0]].toLowerCase();

            let typeInput = document.getElementById('type-input').value.toLowerCase()

            let types = pokemon.pokemon[shuffledPokemons[0]-1].type.map(v => v.toLowerCase());

            if ( ( (wordDiff(input1, answer1) < 3 && wordDiff(input1, answer1) != false) || input1 == answer1 ) && types.includes(typeInput) ) {

                revealPokemon()
                if ( gameMode == 1 ) {
                    currentForeverScore++
                    if ( currentForeverScore > bestForeverScore && skip == 0 ) {
                        bestForeverScore = currentForeverScore;
                    };
                };

                if ( gameMode == 2 ) {
                    currentTimedScore++
                    if ( currentTimedScore > bestTimedScore && skip == 0 ) {
                        bestTimedScore = currentTimedScore;
                    };
                };

                update();
                shuffledPokemons.shift(1,1);
                setTimeout(clearAndDraw, 1000);
            }

        }

    } else {

        if ( difficulty != 3 ) {

            if ( document.getElementById("name-input").value.toLowerCase() == pokedex[shuffledPokemons[0]].toLowerCase() ) {
                revealPokemon();

                // Add difficulty conditions here
                if ( gameMode == 1 ) {
    	            currentForeverScore++
    	            if ( currentForeverScore > bestForeverScore && skip == 0 ) {
    	                bestForeverScore = currentForeverScore;
    	            };
    	        };

    	        if ( gameMode == 2 ) {
    	        	currentTimedScore++
    	            if ( currentTimedScore > bestTimedScore && skip == 0 ) {
    	                bestTimedScore = currentTimedScore;
    	            };
    	        };

                update();
                shuffledPokemons.shift(1,1);
                imgArray.shift(1,1);
                namesArray.shift(1,1);
                typeArray.shift(1,1);

                // Make AJAX request in advance once array has less than 4
                // This is to avoid any 'lag'
                // if ( imgArray.length < 4 ) {
                //     getPokemon();
                // };

                // Timeout delay of 1 second so that user can see the Pokemon before clearing the canvas
                setTimeout(clearAndDraw, 1000);
            };
        };
        if ( difficulty == 3 ) {

            let input1 = document.getElementById("name-input").value.toLowerCase();

            let answer1 = pokedex[shuffledPokemons[0]].toLowerCase();

            let typeInput = document.getElementById('type-input').value.toLowerCase()

            let types = pokemon.pokemon[shuffledPokemons[0]-1].type.map(v => v.toLowerCase());

            if ( input1 == answer1 && types.includes(typeInput) ) {
                revealPokemon();
    	        if ( gameMode == 1 ) {
    	            currentForeverScore++
    	            if ( currentForeverScore > bestForeverScore && skip == 0 ) {
    	                bestForeverScore = currentForeverScore;
    	            };
    	        };
    	        if ( gameMode == 2 ) {
    	        	currentTimedScore++
    	            if ( currentTimedScore > bestTimedScore && skip == 0 ) {
    	                bestTimedScore = currentTimedScore;
    	            };
    	        };

                update();
                shuffledPokemons.shift(1,1);
                imgArray.shift(1,1);
                namesArray.shift(1,1);
                typeArray.shift(1,1);

                // if ( imgArray.length < 4 ) {
                //     getPokemon();
                // };
                setTimeout(clearAndDraw, 1000);
            };
        };
        if ( difficulty == 1 ) {
    	    if ( Boolean( document.getElementById("name-input").value.toLowerCase() == pokedex[shuffledPokemons[0]].toLowerCase() )  == true ) {
            revealPokemon();

	            // Add difficulty conditions here
	            if ( gameMode == 1 ) {
		            currentForeverScore++
		            if ( currentForeverScore > bestForeverScore && skip == 0 ) {
		                bestForeverScore = currentForeverScore;
		            };
		        };

		        if ( gameMode == 2 ) {
		        	currentTimedScore++
		            if ( currentTimedScore > bestTimedScore && skip == 0 ) {
		                bestTimedScore = currentTimedScore;
		            };
		        };

	            update();
	            shuffledPokemons.shift(1,1);
            setTimeout(clearAndDraw, 1000);
	        };
    	};
    };
};

var gameEnd = function() {
    clearCanvas();
    clearInputFields();
};

var seconds = 60;

var timeoutID;

var timeMode = function() {
    rm = document.getElementById("type-input");
    nmbar = document.getElementById("name-input");
    seconds = seconds - 0.05;
    updateBar();
    if ( seconds < 0 ) {
        gameEnd();
        clearTimeout(timeoutID);
        nmbar.style.display = "none";
        rm.style.display = "none";
        progress.textContent = "Your Score: " + currentTimedScore;
    };
};

var startTimedGame = function() {
    timeoutID = setInterval(timeMode, 50);
};

var stopTime = function() {
    clearTimeout(timeoutID);
};

// Forgiving spelling to be implemented

var forgivingSpelling = function() {
    if( spelling == 0 ) {
        spelling = 1;
        document.getElementById('spelling').style.backgroundColor = '#2ECC40';
        document.getElementById('spelling').style.textDecoration = 'none';
    } else {
        spelling = 0;
        document.getElementById('spelling').style.backgroundColor = 'transparent';
        document.getElementById('spelling').style.textDecoration = 'line-through';
    }
}

var wordDiff = function(str1, str2) {

    // If the strings are equal, bail
    if ( str1.toLowerCase() == str2.toLowerCase() ) {
        return 0;
    }

    // If the lengths are not equal, there is no point comparing each character.
    if (str1.length != str2.length) {
        return false;
    }

    // Loop here to go through each position and check if both strings are equal.
    var numDiffChar = 0;
    var index = 0;
    while (index < str1.length) {
        if (str1.toLowerCase().charAt(index) != str2.toLowerCase().charAt(index)) {
            numDiffChar++;
        }
        index++;
    }
    return numDiffChar;
};

document.getElementById('spelling').addEventListener('click', forgivingSpelling)


setUpListeners();
update();
shuffle();








