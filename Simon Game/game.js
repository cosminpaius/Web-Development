var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomNumber;

var start = 0, level = 0;

function nextSequence(){
    userClickedPattern = [];
    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
}

const btn = document.querySelectorAll(".btn");
console.log(btn);
for(var i = 0 ; i <= 3; i++)
    btn[i].addEventListener('click', function() {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    })

function playSound(name){
    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

document.addEventListener('keydown', function(e) {
  if ((e.key === 'a' || e.key === 'A') && start == 0) {
    $("#level-title").text("Level " + level);
    start = 1;
    nextSequence();
  }
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("#level-title").text("Game Over, Press A Key to Restart");

      startOver();
    }
}

function startOver() {
  level = 0;
  gamePattern = [];
  start = 0;
  userClickedPattern = [];
}