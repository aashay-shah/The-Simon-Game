var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Start Game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Generate Random Color Sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Select Color Sequence
$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

// Verify Color Sequence
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Success!");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("Failed!");
    $("#level-title").text("Game Over! Press any Key to Re-Start");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 500);
    startOver();
  }
}

// Restart Game
function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
}

// Utility Functions

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("." + currentColour).addClass("pressed");
  setTimeout(function(){
    $("." + currentColour).removeClass("pressed");
  }, 100);
}
