var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

// detect a keypress
$(document).on("keydown", function () {
    if (!started) {
        started = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

$(document).on("tap", function() {
    if (!started) {
        started = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

// fn for next sequence
function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);  // 0-3

    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

// fn to play sound
function playSound(name) {
    var audio1 = new Audio("./sounds/" + name + ".mp3");
    audio1.play();
}

// fn for animation
function animatePress(CurrentColor) {
    $("#" + CurrentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + CurrentColor).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(playSound("win"), 200);
            $("h1").text("Level Cleared");
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        playSound("wrong");

        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        startOver();
    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}
// rules btn
$("#rules").click(function () {
    if($("i").hasClass("fas fa-angle-down")){
        $("i").removeClass("fas fa-angle-down");
        $("i").addClass("fas fa-angle-up");
    }else{
        $("i").removeClass("fas fa-angle-up");
        $("i").addClass("fas fa-angle-down");
    }
    $("#rulesContent").slideToggle(300);
});

// github button
$("#github").on("click", function(){
    animatePress("github");
    window.open("https://github.com/amitsharma4567/simon", "_blank");
})
