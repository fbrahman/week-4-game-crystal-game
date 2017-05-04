var game = {
    targetNumber:0,
    counter:0,
    winCounter:0,
    lossCounter:0,
    numberOptions:[],

    randomNumber: function (min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    },

    setTargetNumber: function (min,max){
        this.targetNumber = this.randomNumber(min,max);
    },

    setNumberOptions: function (n,min,max){
        for (i = 0; i<n; i++){
            var rand = this.randomNumber(min,max);
            this.numberOptions.push(rand);
        }
    },
    crystalSetUp: function (){

        for (var i = 0; i < this.numberOptions.length; i++) {

            // For each iteration, we will create an imageCrystal
            var imageCrystal = $("<img>");

            // First each crystal will be given the class ".crystal-image".
            // This will allow the CSS to take effect.
            imageCrystal.addClass("crystal-image");

            // Each imageCrystal will be given a src link to the crystal image
            imageCrystal.attr("src", "http://cdn.playbuzz.com/cdn/35910209-2844-45c0-b099-f4d82878d54f/00261fda-4062-4096-81fd-8cf96b9034e8.jpg");

            // Each imageCrystal will be given a data attribute called data-crystalValue.
            // This data attribute will be set equal to the array value.
            imageCrystal.attr("data-crystalvalue", this.numberOptions[i]);

            // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
            $("#crystals").append(imageCrystal);
        }
    },

    targetNumberUpate: function (){
        $("#number-to-guess").text(this.targetNumber);
    },

    gamePlay: function (input){
        var crystalValue = ($(input).attr("data-crystalvalue"));
        crystalValue = parseInt(crystalValue);
        this.counter+=crystalValue;
        $("#currentTotalJS").text(this.counter);
        this.winLose(4, 19, 120, 1, 12);
    },

    winLose: function(n, tnmin, tnmax, nomin, nomax){
        if(this.counter === this.targetNumber){
            this.winCounter++;
            $("#winCounter").text(this.winCounter);
            this.restart(n, tnmin, tnmax, nomin, nomax);
        }
        else if (this.counter >= this.targetNumber){
            this.lossCounter++;
            $("#lossCounter").text(this.lossCounter);
            this.restart(n,tnmin,tnmax,nomin, nomax);
        }
    },

    restart: function(n, tnmin, tnmax, nomin, nomax){
        //Resetting the variables
        this.targetNumber = 0;
        this.counter = 0;
        this.numberOptions = [];
        $("#crystals").empty();
        $("#currentTotalJS").text(this.counter);

        //Setting up the 
        this.setTargetNumber(tnmin,tnmax);
        this.setNumberOptions(n,nomin,nomax);

        this.targetNumberUpate();
        this.crystalSetUp();

        $(".crystal-image").click(function(){
            game.gamePlay(this);
        });

        $("#resetButton").click(function(){
            game.reset(n, tnmin, tnmax, nomin, nomax);
        });
    },

    reset: function(n, tmin, tmax, nomin, nomax){
        this.winCounter=0;
        this.lossCounter=0;

        $("#winCounter").text(this.winCounter);
        $("#lossCounter").text(this.lossCounter);

        this.restart(n, tmin, tmax, nomin, nomax);
    }
};

game.restart(4, 19, 120, 1, 12);