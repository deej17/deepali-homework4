//Timer
var timeEl = document.querySelector(".time");
var secondsLeft = 20;
var score = 0;
var highscore = 10;
function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left to complete the quiz";

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      if (highscore < score) {
        highscore = score;
      }
      timeEl.textContent =
        "The time is up. Your final score is: " +
        score +
        " and the highscore is till now is " +
        highscore;
      if (highscore < score) {
        highscore = score;
      }
    }
  }, 1000);
}
//--------------------------------------------------------------------------
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const optionButtonsElement = document.getElementById("option-buttons");
var message = document.getElementById("message");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  secondsLeft = 20;
  score = 0;
  setTime();
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option.text;
    button.classList.add("btn");
    if (option.correct) {
      button.dataset.correct = option.correct;
    }
    button.addEventListener("click", selectoption);
    optionButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
}

function selectoption(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(optionButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Completed";
    startButton.classList.remove("hide");
    startButton.disabled = true;
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    score++;
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
    // secondsLeft -= 10;
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
  message.textContent = "";
}

//--------------------------------------------------------------------------
//Array of Questions
var questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: [
      { text: "<scripting>", correct: false },
      { text: "<script>", correct: true },
      { text: "<jsscript>", correct: false },
      { text: "<JS-HTML>", correct: false }
    ]
  },
  {
    question: "What is CSS?",
    options: [
      { text: "Cascading Single Sheet", correct: false },
      { text: "Cascading SQL Sheet", correct: false },
      { text: "Cascading Style Sheet", correct: true },
      { text: "Collaboration Style Sheet", correct: false }
    ]
  },
  {
    question: "Which is the function used to retrieve a value?",
    options: [
      { text: "getItem()", correct: true },
      { text: "receiveItem()", correct: false },
      { text: "retrieveItem()", correct: false },
      { text: "inputItem()", correct: false }
    ]
  },
  {
    question: "What is the purpose of the assign() method?",
    options: [
      { text: "Loading javascript and css files", correct: false },
      { text: "Assigning value to a variable", correct: false },
      { text: "Loading of buttons and assigning values", correct: false },
      { text: "Loading of window and display", correct: true }
    ]
  },
  {
    question: "Which of the following is not a reserved word in JavaScript?",
    options: [
      { text: "interface", correct: false },
      { text: "throws", correct: false },
      { text: "program", correct: true },
      { text: "parseInt", correct: false }
    ]
  }
];
