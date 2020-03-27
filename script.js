var timeEl = document.querySelector(".time");
var mainEl = document.querySelector("#main");
var score = 0;

var secondsLeft = 10;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left to complete the quiz";

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 1000);
}

function sendMessage() {
  timeEl.textContent = "The time is up. You scored: " + score;
}

setTime();
