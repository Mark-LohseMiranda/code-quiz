var start = document.querySelector(".start");
var timeEl = document.querySelector(".time");
var title = document.querySelector(".title");
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


var questionsArray = [
  {
    question: "How much do I love javascript?",
    answer1: "so much",
    answer2: "This is the correct answer",
    answer3: "so much",
    answer4: "Too much",
    correctAnswer: "answer2",
  },

  {
    question: "How much do I love css?",
    answer1: "one",
    answer2: "two",
    answer3: "three",
    answer4: "This is the correct answer",
    correctAnswer: "answer4",
  },

  {
    question: "Question #3",
    answer1: "one",
    answer2: "two",
    answer3: "three",
    answer4: "This is the correct answer",
    correctAnswer: "answer1",
  },
];

function displayQuestion() {
  title.setAttribute("class", "title hide");
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
    instructions.setAttribute("class", "instruction show");
    instructions.textContent = `Your score is: ${timerCount}`;
    formEl.setAttribute("class", "form");
}

function loseQuiz() {
    alert("you lose");
}

initialsForm.addEventListener("submit", function(event) {
    event.preventDefault();
    highScoreObj["Initials"] = initialsInput.value;
    highScoreObj["Score"] = timerCount;
    highScore.push(highScoreObj);
    highScoreObj = {};
    localStorage.setItem("coding-quiz-highscore", JSON.stringify(highScore));
    scoreBoard();    
})

function scoreBoard() {
    formEl.setAttribute("class", "form hide");
    scoreBoardEl.setAttribute("class", "scoreBoard");
    highScore.sort((a, b) => (a.Score < b.Score) ? 1 : -1);
    for (let i = 0; i < highScore.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = highScore[i].Initials + ": " + highScore[i].Score;
        highScoreListEl.append(listItem);
    }
}

function startTime() {
    timer = setInterval(function() {
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

function runGame() {
    var storedHighScores = JSON.parse(localStorage.getItem("coding-quiz-highscore"));
    if (storedHighScores !== null) {
        highScore = storedHighScores;
    }
    startTime();
    displayQuestion();
}

start.addEventListener("click", runGame);
