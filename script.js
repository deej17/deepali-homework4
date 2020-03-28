//Timer
var timeEl = document.querySelector(".time");
var mainEl = document.querySelector("#main");
var secondsLeft = 10;
var score = 0;

var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const optionElement = document.getElementById("option-buttons");
var shuffledQuestions, currentQuestionIndex;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left to complete the quiz";

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      timeEl.textContent = "The time is up. You scored: " + score;
    }
  }, 1000);
}

setTime();

//Array of Questions
var Questions = [
  {
    questionStem: "Q1. Inside which HTML element do we put the JavaScript?",
    options: [
      { text: "<scripting>", correct: false },
      { text: "<script>", correct: true },
      { text: "<jsscript>", correct: false }
    ],
    questionStem: "Q2. What is CSS?",
    options: [
      { text: "Cascading Single Sheet", correct: false },
      { text: "Cascading SQL Sheet", correct: false },
      { text: "Cascading Style Sheet", correct: true }
    ],
    questionStem: "Q3. Which is the function used to retrieve a value?",
    options: [
      { text: "getItem()", correct: true },
      { text: "receiveItem()", correct: false },
      { text: "retrieveItem()", correct: false }
    ],
    questionStem: "Q4. What is the purpose of the assign() method?",
    options: [
      { text: "Loading javascript and css files", correct: false },
      { text: "Assigning value to a variable", correct: false },
      { text: "Loading of window and display", correct: true }
    ]
  }
];
//Quiz functionality
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame(e) {
  console.log("Started");
  startButton.classList.add("hide");
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
  questionElement.innerText = Questions.questionStem;
  optionElement.options.array.forEach(options => {
    const button = document.createElement("button");
    button.innerText = options.text;
    button.classList.add("btn");
    if (options.correct) {
      button.dataset.correct = options.correct;
    }
    button.addEventListener("click", selectAnswer);
    optionElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (optionElement.firstChild) {
    optionElement.removeChild(optionElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(optionElement.children).forEach(button =>
    setStatusClass(button, button.dataset.correct)
  );
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
