

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicators")
const homeBox = document.querySelector(".home-box")
const quizBox = document.querySelector(".quiz-box")
const resultBox = document.querySelector(".result-box")

let questionCounter = 0
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0
let attempt = 0

// // push the questions into availableQuestions Array
function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        // console.log(quiz[i])
        availableQuestions.push(quiz[i])
    }
    // console.log(availableQuestions)
}

// // set question number and question and options
function getNewQuestion() {
    // console.log("hi")
    questionText.innerHTML = ""
    optionContainer.innerHTML = ""

    // set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    // set question text
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex];
    questionText.innerHTML = currentQuestion.q;
    // console.log(questionIndex)

    //set options
    //get the length of options
    const optionLen = currentQuestion.options
    // console.log(currentQuestion.options)

    //push options into availableOptions Array
    for (let i = 0; i < optionLen.length; i++) {
        availableOptions.push(i)
    }
    // console.log(availableOptions)


    let animationDelay = 0.15;
    // create options in html
    for (let i = 0; i < optionLen.length; i++) {
        // random option
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        //get the position of "optonIndex" from the availableOptions
        const index2 = availableOptions.indexOf(optonIndex);
        availableOptions.splice(index2, 1)
        // console.log(optonIndex)
        // console.log(availableOptions)

        const option = document.createElement("div")
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + "s";
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        // console.log(option)
        option.setAttribute("onclick", "getResult(this)")
    }

    questionCounter++
}

//get the result of current attempt question
function getResult(element) {
    const id = parseInt(element.id);
    // console.log(id)
    //get the answer by comparing the id of clicked option
    if (id === currentQuestion.answer) {
        // set the green color to the correct option
        element.classList.add("correct")
        //add the indicator to correct mark
        updateAnswerIndicator("correct")
        correctAnswers++;
    } else {
        // set the red color to the incorrect option
        element.classList.add("wrong")
        //add the indicator to incorrect mark
        updateAnswerIndicator("wrong")
    }

    const optionLen = optionContainer.children;
    for (let i = 0; i < optionLen.length; i++) {
        if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
            optionContainer.children[i].classList.add("correct");
        }
    }
    attempt++;
    unclickableOptions();

}

//make all the options unclickable once the user select a option (RESTRICT THE USER TO CHANGE THE OPTION AGAIN)
function unclickableOptions() {
    const optionLen = optionContainer.children
    for (let i = 0; i < optionLen.length; i++) {
        optionContainer.children[i].classList.add("already-answered")
    }
}

function answersIndicator() {
    answersIndicatorContainer.innerHTML = "";
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}
function updateAnswerIndicator(markType) {
    answersIndicatorContainer.children[questionCounter - 1].classList.add(markType)

}

function next() {
    if (questionCounter === quiz.length) {
        console.log("quiz over")
        quizOver();
    } else {
        getNewQuestion();
    }
}

function quizOver() {
    //hide quiz quizBox
    quizBox.classList.add("hide");
    // show quiz quizBox
    quizBox.classList.remove("hide");
    // quizResult()
}


function quizResult() {
    resultBox.querySelector("total-question").innerHTML = quiz.length
    resultBox.querySelector("total-attempt").innerHTML = attempt
    resultBox.querySelector("total-correct").innerHTML = correctAnswers;
    resultBox.querySelector("total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers / quiz.length) * 100;
    resultBox.querySelector("percentage").innerHTML = percentage.toFixed() + "%";
    resultBox.querySelector("total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

window.onload = function () {
    //     // first will set all questions in availableQuestions Array
    setAvailableQuestions();
    //     // second will call getNewQuestion() function
    getNewQuestion();

    //to create indicator of answer
    answersIndicator();
}
