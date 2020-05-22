var btnColor = ["red", "blue", "green", "yellow"];
var gamePattern = []; 
var userPattern = [];  
var started = false;
var level = 0;
var highScore = 0;
var currentScore = 0;

$(".goButton").click(function(event){
    if(started === false){
      nextSeq();
      started = true;
      $(".goButton").hide();
      $(".iButton").hide();
    }
});

$(".btn").click(function(){
    if(started === true){
        var userChosenColor = $(this).attr("id");
        userPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userPattern.length-1);
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length === userPattern.length){
            setTimeout(function(){
                currentScore++;
                if(currentScore > highScore)
                    $(".p-highscore").text("Your highscore: " + currentScore);
                $(".p-currentscore").text("Your current score: " + currentScore);
                nextSeq();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        if(currentScore > highScore){
            highScore = currentScore;
            $(".p-highscore").text("Your highscore: " + highScore);
        }
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, press ↺ to play again");
        setTimeout(function(){
            $("body").removeClass("game-over"); 
        }, 200);
        $(".goButton").text("↺");
        startOver();
    }
}

function nextSeq(){
    userPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var rand = Math.floor(Math.random()*4);
    var chosenColor = btnColor[rand];
    gamePattern.push(chosenColor);
    $("#"+chosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(chosenColor);
}

function playSound(name){
    var aud = new Audio("sounds/"+name  +".mp3");
    aud.play();
}

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    currentScore = 0;
    $(".p-currentscore").text("Your current score: " + currentScore);
    $(".goButton").show();
    $(".iButton").show();
}
