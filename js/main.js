const answers = document.body.querySelectorAll(".answer");
let number = 0; // number of question
let score = 0; // number of right answers
let lineWidth = 100; // width of timer line
let checkSelection = false; // check if the answer is selected

const questions = [
    {
        ask: 'Jaka jest stolica Wenezueli?',
        answers: [
            {text: "Montevideo", correct: "false"},
            {text: "Bogota", correct: "false"},
            {text: "Caracas", correct: "true"},
            {text: "Bangkok", correct: "false"}
        ]
    },
    {
        ask: 'Jakie państwo nie graniczy z Francją?',
        answers: [
            {text: "Belgia", correct: "false"},
            {text: "Niemcy", correct: "false"},
            {text: "Andora", correct: "false"},
            {text: "Holandia", correct: "true"}
        ]
    },
    {
        ask: 'Jaka jest stolica Kanady?',
        answers: [
            {text: "Ottawa", correct: "true"},
            {text: "Dublin", correct: "false"},
            {text: "Juneau", correct: "false"},
            {text: "Waszyngton", correct: "false"}
        ]
    },
    {
        ask: 'Jaka jest stolica Chin?',
        answers: [
            {text: "Pekin", correct: "true"},
            {text: "Tokio", correct: "false"},
            {text: "Seul", correct: "false"},
            {text: "Hongkong", correct: "false"}
        ]
    },
    {
        ask: 'Jaka jest stolica Rumuni?',
        answers: [
            {text: "Budapeszt", correct: "false"},
            {text: "Bukareszt", correct: "true"},
            {text: "Warszawa", correct: "false"},
            {text: "Lizbona", correct: "false"}
        ]
    }
]

const loadAnswer = () => {
        document.querySelector("h1").textContent = questions[number].ask;
        document.querySelector(".first").textContent = questions[number].answers[0].text;
        document.querySelector(".first").dataset.correct = questions[number].answers[0].correct;
    
        document.querySelector(".second").textContent = questions[number].answers[1].text;
        document.querySelector(".second").dataset.correct = questions[number].answers[1].correct;
    
        document.querySelector(".third").textContent = questions[number].answers[2].text;
        document.querySelector(".third").dataset.correct = questions[number].answers[2].correct;
    
        document.querySelector(".fourth").textContent = questions[number].answers[3].text;
        document.querySelector(".fourth").dataset.correct = questions[number].answers[3].correct;
}

loadAnswer();

// timer
const countTime = () => {
    if (lineWidth >= 0) {
        lineWidth -= 0.1;
        document.body.querySelector(".line").style.width = lineWidth + "%";
    } else if (lineWidth <= 0) {
        showAnswer();
    }
}

timer = setInterval(countTime, 10);

// after choice answer
const showAnswer = (e) => {

    clearInterval(timer);

    if (checkSelection == false) {
        number += 1;
    }

    if (number == "5") {
        document.body.querySelector(".nextBtn").textContent = "Zakończ"
    }

    if (checkSelection == false) {
        document.body.querySelector(".nextBtn").style.display = "block";
        answers.forEach(answer => answer.style.borderBottom = "none");
        answers.forEach(answer => answer.style.background = "red");
    }

    if (checkSelection == false && lineWidth >= 0) {
        e.target.style.border = "4px solid black";
        if (e.target.dataset.correct == "true") {
            score += 1;
        }
    }

    checkSelection = true;

    // show right answer
    if (questions[number - 1].answers[0].correct == "true") {
        document.querySelector(".first").style.background = "yellow";
    } else if (questions[number - 1].answers[1].correct == "true") {
        document.querySelector(".second").style.background = "yellow";
    } else if (questions[number - 1].answers[2].correct == "true") {
        document.querySelector(".third").style.background = "yellow";
    } else if (questions[number - 1].answers[3].correct == "true") {
        document.querySelector(".fourth").style.background = "yellow";
    }

}

// after click next button
const nextQuestion = () => {
    checkSelection = false;
    lineWidth = 100;

    timer = setInterval(countTime, 10);

    document.body.querySelector(".nextBtn").style.display = "none";
    answers.forEach(answer => answer.style.border = "none");
    answers.forEach(answer => answer.style.borderBottom = "10px solid rgb(106, 106, 204)");
    answers.forEach(answer => answer.style.background = "rgb(133, 133, 255)");

    if (document.body.querySelector(".nextBtn").textContent == "Następne >") {
        loadAnswer();
    }
}

// show score after finish quiz
const showScore = () => {
    if (number == "5") {
        document.body.querySelector(".scoreBox").style.display = "block";
        document.body.querySelector(".score").style.display = "flex";
        document.body.querySelector(".scoreTitle").innerHTML = `Gratulacje!</br>Twój wynik to ${score}/5`;

        number = 0;
        score = 0;

        document.body.querySelector(".nextBtn").style.display = "none";
        answers.forEach(answer => answer.style.border = "none");
        answers.forEach(answer => answer.style.borderBottom = "10px solid rgb(106, 106, 204)");
        answers.forEach(answer => answer.style.background = "rgb(133, 133, 255)");

        clearInterval(timer);

    }
}

// hide border on hover
const hideBorder = (e) => {
    if (checkSelection == false) {
    e.target.style.border = "none";
    }
}

// hide border on leave mouse
const showBorder = (e) => {
    if (checkSelection == false) {
    e.target.style.borderBottom = "10px solid rgb(106, 106, 204)";
    }
}

// return quiz
const restart = () => {
    document.body.querySelector(".scoreBox").style.display = "none";
    document.body.querySelector(".score").style.display = "none";
    document.body.querySelector(".nextBtn").textContent = "Następne >"

    timer = setInterval(countTime, 10);

    loadAnswer();
}

answers.forEach(answer => answer.addEventListener("click", showAnswer))
document.body.querySelector(".nextBtn").addEventListener("click", nextQuestion)
document.body.querySelector(".nextBtn").addEventListener("click", showScore)
answers.forEach(answer => answer.addEventListener("mouseover", hideBorder))
answers.forEach(answer => answer.addEventListener("mouseout", showBorder))
document.body.querySelector(".return").addEventListener("click", restart)
