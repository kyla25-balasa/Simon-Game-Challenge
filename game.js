alert("hello");

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var acceptingInput = false;

// STEP 7: Start using any keyboard key
$(document).on("keydown", function () {
  if (!started) {
    startGame();
  }
});

// Allow a colored box to start or restart, too
$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");

  if (!started) {
    startGame();
    return;
  }

  // Do not accept clicks while showing the sequence
  if (!acceptingInput) {
    return;
  }

  // STEP 4: Save the player's chosen color
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // STEP 8: Check the answer
  checkAnswer(userClickedPattern.length - 1);
});

// Start a new game
function startGame() {
  startOver();

  started = true;
  $("body").removeClass("game-over");

  nextSequence();
}

// STEP 2: Generate a random color
function nextSequence() {
  userClickedPattern = [];
  acceptingInput = false;

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  console.log("Game pattern:", gamePattern);

  // STEP 3: Flash the random button and play its sound
  setTimeout(function () {
    $("#" + randomChosenColour)
      .stop(true, true)
      .fadeOut(100)
      .fadeIn(100);

    playSound(randomChosenColour);
  }, 300);

  // Let the player answer after the flash finishes
  setTimeout(function () {
    acceptingInput = true;
  }, 600);
}

// STEP 5: Play the sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play().catch(function (error) {
    console.log("Could not play sound:", name, error);
  });
}

// STEP 6: Animate the clicked button
function animatePress(currentColour) {
  var activeButton = $("#" + currentColour);

  activeButton.addClass("pressed");

  setTimeout(function () {
    activeButton.removeClass("pressed");
  }, 100);
}

// STEP 8: Check the player's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
    gameOver();
    return;
  }

  console.log("Correct answer!");

  // Player completed the entire sequence
  if (userClickedPattern.length === gamePattern.length) {
    acceptingInput = false;

    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

// STEP 9: Game Over
function gameOver() {
  started = false;
  acceptingInput = false;

  playSound("wrong");

  $("body").addClass("game-over");

  $("#level-title").text("Game Over! Press Any Key to Restart");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  startOver();
}

// STEP 10: Reset the game variables
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  acceptingInput = false;
}
