let currentQuestionIndex = 0;
let timer;
let timeLeft = 60; // example time limit

function startQuiz() {
    // hide start button, show first question
    // start timer
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
    showQuestion();
}

document.getElementById('start-btn').addEventListener('click', startQuiz);
