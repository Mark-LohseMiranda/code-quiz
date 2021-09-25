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

var questionsArray = [
  {
    question: "What is two times two?",
    answer1: "Two",
    answer2: "Three",
    answer3: "Four",
    answer4: "Five",
    correctAnswer: "answer3",
  },

  {
    question: "What is sixty-four divided by eight?",
    answer1: "Seven",
    answer2: "Eight",
    answer3: "Nine",
    answer4: "Ten",
    correctAnswer: "answer2",
  },

  {
    question: "What is ten times ten?",
    answer1: "Ten",
    answer2: "Twenty",
    answer3: "Threnty",
    answer4: "One Hundred",
    correctAnswer: "answer4",
  },

  {
    question: "What is sixty-two plus twenty-six?",
    answer1: "Eighty-eight",
    answer2: "Seventy-eight",
    answer3: "Sixty-eight",
    answer4: "Ninety-eight",
    correctAnswer: "answer1",
  },

  {
    question: "What is one thousand times one thousand?",
    answer1: "One hundred thousand",
    answer2: "Ten thousand",
    answer3: "One million",
    answer4: "Nine hundred and ninety-nine thousand and nine hundred and ninety-nine",
    correctAnswer: "answer3",
  },
];

function displayQuestion() {
  titleEl.setAttribute("class", "title hide");
  instructions.setAttribute("class", "instruction hide");
  question.setAttribute("class", "question");
  answers.setAttribute("class", "answers");
  start.setAttribute("class", "start hide");
  populateQuestion(num);
}

function populateQuestion() {
  question.textContent = questionsArray[num].question;
  answer1.textContent = questionsArray[num].answer1;
  answer2.textContent = questionsArray[num].answer2;
  answer3.textContent = questionsArray[num].answer3;
  answer4.textContent = questionsArray[num].answer4;
  correctAnswer = questionsArray[num].correctAnswer;
}

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

function quizWon() {
  answers.setAttribute("class", "answers hide");
  question.setAttribute("class", "question hide");
  titleEl.textContent = "You Won!!";
  titleEl.setAttribute("class", "title");
  instructions.setAttribute("class", "instruction");
  instructions.textContent = `Your score is: ${timerCount}`;
  formEl.setAttribute("class", "form");
}

function loseQuiz() {
  answers.setAttribute("class", "answers hide");
  question.setAttribute("class", "question hide");
  lost = true;
  scoreBoard();
}

initialsForm.addEventListener("submit", function (event) {
  event.preventDefault();
  highScoreObj["Initials"] = initialsInput.value;
  highScoreObj["Score"] = timerCount;
  highScore.push(highScoreObj);
  highScoreObj = {};
  localStorage.setItem("coding-quiz-highscore", JSON.stringify(highScore));
  scoreBoard();
});

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

viewHighScoreEl.addEventListener("click", function () {
  instructions.setAttribute("class", "instruction hide");
  start.setAttribute("class", "start hide");
  scoreBoard();
});

clearHighScores.addEventListener("click", function () {
  localStorage.clear();
  highScore = [];
  instructions.setAttribute("class", "instruction hide");
  highScoreListEl.setAttribute("class", "highScoreList hide");
});

goBackEl.addEventListener("click", function () {
  location.reload();
});

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

function getHighScores() {
  var storedHighScores = JSON.parse(
    localStorage.getItem("coding-quiz-highscore")
  );
  if (storedHighScores !== null) {
    highScore = storedHighScores;
  }
}

function runGame() {
  lost = false;
  startTime();
  displayQuestion();
}

getHighScores();
start.addEventListener("click", runGame);
