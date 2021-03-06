var start = document.querySelector(".start");
var viewHighScoreEl = document.querySelector(".view");
var clearHighScores = document.querySelector(".clearHighScores");
var headerEl = document.querySelector("header");
var goBackEl = document.querySelector(".goBack");
var timeEl = document.querySelector(".time");
var titleEl = document.querySelector(".title");
var instructions = document.querySelector(".instructions");
var question = document.querySelector(".question");
var answers = document.querySelector(".answers");
var answer1 = document.querySelector(".answer1");
var answer2 = document.querySelector(".answer2");
var answer3 = document.querySelector(".answer3");
var answer4 = document.querySelector(".answer4");
var initialsForm = document.querySelector("#initialsForm");
var initialsInput = document.querySelector("#initials");
var formEl = document.querySelector(".form");
var scoreBoardEl = document.querySelector(".scoreBoard");
var highScoreListEl = document.querySelector(".highScoreList");
var correctAnswer, timer;
var timerCount = 80;
var num = 0;
var isDone = false;
var highScore = [];
var highScoreObj = {};
var lost = false;

// List of questions

var questionsArray = [
  {
    question: "What does CSS stand for?",
    answer1: "Cascading Simple Sheets",
    answer2: "Cascading Slick Sheets",
    answer3: "Cascading Style Sheets ",
    answer4: "Cringy Silly Blankets",
    correctAnswer: "answer3",
  },

  {
    question: "Which property is used to change the background color?",
    answer1: "color-background",
    answer2: "background-color",
    answer3: "color-back",
    answer4: "back-color",
    correctAnswer: "answer2",
  },

  {
    question: "Where in a HTML document is the correct place to refer to an external style sheet?",
    answer1: "At the end",
    answer2: "In the <body> section",
    answer3: "In the <style> section",
    answer4: "In the <head> section",
    correctAnswer: "answer4",
  },

  {
    question: "Which is a proper CSS comment?",
    answer1: "/* This is a CSS comment */",
    answer2: "// This is a CSS comment //",
    answer3: "* This is a CSS comment *",
    answer4: "/ This is a CSS comment /",
    correctAnswer: "answer1",
  },

  {
    question: "What is the proper way to creat a CSS rule for a class?",
    answer1: "#className { }",
    answer2: "className { }",
    answer3: ".className { }",
    answer4: ",className { }",
    correctAnswer: "answer3",
  },
];

// Hides irrelevent sections of HTML and shows relevent sections then
// moves to create the question and answers

function displayQuestion() {
  titleEl.setAttribute("class", "title hide");
  instructions.setAttribute("class", "instruction hide");
  question.setAttribute("class", "question");
  answers.setAttribute("class", "answers");
  start.setAttribute("class", "start hide");
  populateQuestion();
}

// gets the locally stored data

function getHighScores() {
  var storedHighScores = JSON.parse(
    localStorage.getItem("coding-quiz-highscore")
  );
  if (storedHighScores !== null) {
    highScore = storedHighScores;
  }
}
// if you lose the quiz then hide the question and answers and show the
// scoreBoard

function loseQuiz() {
  answers.setAttribute("class", "answers hide");
  question.setAttribute("class", "question hide");
  lost = true;
  scoreBoard();
}
// Pulls the current question and answers from the list of questions and
// adds them to the HTML

function populateQuestion() {
  question.textContent = questionsArray[num].question;
  answer1.textContent = questionsArray[num].answer1;
  answer2.textContent = questionsArray[num].answer2;
  answer3.textContent = questionsArray[num].answer3;
  answer4.textContent = questionsArray[num].answer4;
  correctAnswer = questionsArray[num].correctAnswer;
}

// quiz has been completed hide the question and answers and show a win
// message along with the score and initials form

function quizWon() {
  answers.setAttribute("class", "answers hide");
  question.setAttribute("class", "question hide");
  titleEl.textContent = "You Won!!";
  titleEl.setAttribute("class", "title");
  instructions.setAttribute("class", "instruction");
  instructions.textContent = `Your score is: ${timerCount}`;
  formEl.setAttribute("class", "form");
}

// resets lost variable, starts the timer, and displays first question

function runGame() {
  lost = false;
  startTime();
  displayQuestion();
}

// build a scoreBoard with a different message depending on if you won or lost
// additionally sorts the highScore by Score

function scoreBoard() {
  headerEl.setAttribute("class", "hide");
  formEl.setAttribute("class", "form hide");
  if (!lost) {
    titleEl.textContent = "Highscores";
  } else {
    titleEl.textContent = "You Lost :(";
  }
  titleEl.setAttribute("class", "title");
  scoreBoardEl.setAttribute("class", "scoreBoard");
  highScore.sort((a, b) => (a.Score < b.Score ? 1 : -1));
  for (let i = 0; i < highScore.length; i++) {
    var listItem = document.createElement("li");
    listItem.textContent = highScore[i].Initials + ": " + highScore[i].Score;
    highScoreListEl.append(listItem);
  }
}

// starts the timer until either the quiz is completed or timerCount is 0

function startTime() {
  timer = setInterval(function () {
    timerCount--;
    timeEl.textContent = `Time left: ${timerCount}`;
    if (timerCount >= 0) {
      if (isDone && timerCount > 0) {
        clearInterval(timer);
        quizWon();
      }
    }
    if (timerCount <= 0) {
      clearInterval(timer);
      loseQuiz();
    }
  }, 1000);
}

// Listens for clicks on the answers DIV. If the click matches the correct
// answer increase num (to move to the next question in the object)
// if there are more questions populate the next question; if there aren't
// change isDone to true
// if it isn't the correct answer subtract 10 from the timer

answers.addEventListener("click", function (event) {
  var element = event.target;
  if (element.matches(`.${correctAnswer}`)) {
    num++;
    if (num < questionsArray.length) {
      populateQuestion();
    } else {
      isDone = true;
    }
  } else {
    timerCount = timerCount - 10;
  }
});

// listens for clicks on the clear high score button. Once clicked it clears
// localStorage and blanks out highScore then hides the now irrelevent
// parts

clearHighScores.addEventListener("click", function () {
  localStorage.clear();
  highScore = [];
  instructions.setAttribute("class", "instruction hide");
  highScoreListEl.setAttribute("class", "highScoreList hide");
});

// listens for clicks on the go back button. Once clicked it reloads the page
// which brings the user back to the main screen

goBackEl.addEventListener("click", function () {
  location.reload();
});

// listen for the submit from the initials form then place the intials and score
// into the highScore object. Then push that into highScore before blanking out
// the highScore object for the next game; then local store the array after making
// a string

initialsForm.addEventListener("submit", function (event) {
  event.preventDefault();
  highScoreObj["Initials"] = initialsInput.value;
  highScoreObj["Score"] = timerCount;
  highScore.push(highScoreObj);
  highScoreObj = {};
  localStorage.setItem("coding-quiz-highscore", JSON.stringify(highScore));
  scoreBoard();
});

// when start is clicked start the quiz

start.addEventListener("click", runGame);

// listens for clicks on a view high score button. When clicked hide the
// irrelevent parts and then display the scoreBoard

viewHighScoreEl.addEventListener("click", function () {
  instructions.setAttribute("class", "instruction hide");
  answers.setAttribute("class", "answers hide");
  question.setAttribute("class", "question hide");
  start.setAttribute("class", "start hide");
  scoreBoard();
});

// ensure that the locally stored data is avaiable for the show high
// scores button

getHighScores();
