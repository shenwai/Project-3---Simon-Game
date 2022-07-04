var buttonColours = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];

var gameStatus = "";

var started = true;
var level = 0;

$(document).keydown(function (e) {
  if (started) {
    $("#level-title").text("Level " + level);
    started = false;
    nextSequence();
  }
});

$(".btn").click(function () {
  var chosenColor = $(this).attr("id");
  userClickedPattern.push(chosenColor);
  console.log("User clicked pattern: " + userClickedPattern);

  playSound(chosenColor);
  animatePress(chosenColor);

  checkAnswer();
});

function checkAnswer() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (i === gamePattern.length - 1) {
      if (userClickedPattern[i] === gamePattern[i]) {
        gameStatus = "success";
        console.log(gameStatus);
        setTimeout(() => {
          nextSequence();
        }, 1000);
      } else {
        gameStatus = "fail";
        console.log(gameStatus);
      }
    }
    if (userClickedPattern[i] != gamePattern[i]) {
      gameStatus = "fail";
      console.log(gameStatus);
    }

    if (gameStatus === "fail") {
      setTimeout(() => {
        $("#level-title").text("WRONG!");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        setTimeout(() => {
          location.reload(true);
        }, 2000);
      }, 300);
      break;
    }
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log("Game pattern: " + gamePattern);

  animatePress(randomChosenColor);
  playSound(randomChosenColor);
}

function playSound(color) {
  var colorAudio = new Audio("sounds/" + color + ".mp3");
  colorAudio.play();
}

function animatePress(color) {
  var pressColor = "#" + color;
  $(pressColor).addClass("pressed");
  setTimeout(() => {
    $(pressColor).removeClass("pressed");
  }, 100);
}
