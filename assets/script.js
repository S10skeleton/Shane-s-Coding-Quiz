// set needed variables and configure the time limit 

let currentQuestionIndex = 0;
let timer;
let timeLeft = 60; // time limit

    // funtion to hide start button after clicked and show first question
    // it will also start the timer  

function startQuiz()  {
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
