var start = document.querySelector(".start");
var title = document.querySelector(".title");
var instructions = document.querySelector(".instructions");
var question = document.querySelector(".question");
var answers = document.querySelector(".answers");
var answerOne = document.querySelector(".answerOne")
var answerTwo = document.querySelector(".answerTwo")
var answerThree = document.querySelector(".answerThree")
var answerFour = document.querySelector(".answerFour")
var correctAnswer
var num = 0;

var questionsArray = [

{
    question:"How much do I love javascript?",
    answerOne: "so much",
    answerTwo: "This is the correct answer",
    answerThree: "so much",
    answerFour: "Too much",
    correctAnswer: "answerTwo" 
},

{
    question:"How much do I love css?",
    answerOne: "one",
    answerTwo: "two",
    answerThree: "three",
    answerFour: "This is the correct answer",
    correctAnswer: "answerFour"
    

},

{
    question:"Question #3",
    answerOne: "one",
    answerTwo: "two",
    answerThree: "three",
    answerFour: "This is the correct answer",
    correctAnswer: "answerOne"
    

}

]


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
    answerOne.textContent = questionsArray[num].answerOne;
    answerTwo.textContent = questionsArray[num].answerTwo;
    answerThree.textContent = questionsArray[num].answerThree;
    answerFour.textContent = questionsArray[num].answerFour;
    correctAnswer = questionsArray[num].correctAnswer;    
}

answers.addEventListener("click", function(event){
    var element = event.target;
    if (element.matches(`.${correctAnswer}`)) {
        alert("correct");
        num++;
        if (num < questionsArray.length) {
        populateQuestion();
        } else {
            gameOver();
        }
    }    
})

function gameOver(){
    alert("game over");
}

start.addEventListener("click", displayQuestion);