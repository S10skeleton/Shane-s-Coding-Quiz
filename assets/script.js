// set needed variables and configure the time limit

let currentQuestionIndex = 0;
let timer;
let timeLeft = 60; // time limit
let finalScore = 0;

// funtion to hide start button after clicked and show first question
// it will also start the timer

function startQuiz() {
  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= -1) {
      clearInterval(timer);
      endQuiz();
    } else {
      document.getElementById("timer").innerText = "Time Left: " + timeLeft;
    }
  }, 1000);
  showQuestion();
}

document.getElementById("start-btn").addEventListener("click", startQuiz);

// List of questions
const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: ["<script>", "<scripting>", "<javascript>", "<js>"],
    correct: 0,
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: ["Both the <head> and <body>", "The <head> section", "The <body> section", "The very top"],
    correct: 2,
  },
  {
    question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    answers: ["if(i != 5)", "if (i <> 5)", "if i <> 5", "if i =! 5 then"],
    correct: 0,
  },
  {
    question: "How can you add a comment in a JavaScript?",
    answers: ["<!--This is a comment-->", "//This is a comment", "'This is a comment", "#??This is a comment??"],
    correct: 1,
  },
  {
    question: "How do you declare a JavaScript variable?",
    answers: [ "variable carName;", "v carName;", "set carName;", "var carName;"],
    correct: 3,
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    answers: ["-", "x", "=", "#"],
    correct: 2,
  },
];

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  document.getElementById("question").innerText = currentQuestion.question;
  const answersButtons = document.querySelectorAll(".answer");
  answersButtons.forEach((button, index) => {
    button.innerText = currentQuestion.answers[index];
    button.disabled = false;
    button.replaceWith(button.cloneNode(true));
  });
  const newAnswersButtons = document.querySelectorAll(".answer");
  newAnswersButtons.forEach((button, index) => {
    button.addEventListener("click", () =>
      handleAnswer(index === currentQuestion.correct)
    );
  });
}

function handleAnswer(isCorrect) {
  if (!isCorrect) {
    timeLeft -= 5; // Apply penalty
  }

  displayResult(isCorrect); // Display the result message

  // Disable answer buttons to prevent multiple selections
  const answersButtons = document.querySelectorAll(".answer");
  answersButtons.forEach((button) => {
    button.disabled = true;
  });

  // Show next button
  document.getElementById("next-btn").style.display = "block";
}
// display results color coded to correct or wrong answer 
function displayResult(isCorrect) {
  const resultElement = document.getElementById("result-message");
  resultElement.innerText = isCorrect ? "Correct!" : "Wrong!";
  resultElement.style.display = "block"; // Show result message

  if (isCorrect) {
    resultElement.classList.add("correct-answer");
    resultElement.classList.remove("wrong-answer");
  } else {
    resultElement.classList.add("wrong-answer");
    resultElement.classList.remove("correct-answer");
  }
}
document.getElementById("next-btn").addEventListener("click", nextQuestion);

function nextQuestion() {
  document.getElementById("result-message").style.display = "none"; // Hide result message
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    finalScore = timeLeft;
    endQuiz();
  }
}

// Hide next button until the next answer is selected
document.getElementById("next-btn").style.display = "none";

function endQuiz() {
  clearInterval(timer);
  document.getElementById(
    "results"
  ).innerText = `Quiz finished! Your score: ${finalScore}`;
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("score-submission").style.display = "block"; // Show score submission


}

// Hide the quiz container initially
document.getElementById("quiz-container").style.display = "none";

// Start button functionality
document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("start-btn").style.display = "none";
  startQuiz();
});

// function to restart the quiz at any time

document.getElementById("restart").addEventListener("click", function () {
  location.reload();
});

// function to store current score into high score list
function submitScore() {
  const userName = document.getElementById("user-name").value;
  const newScore = { name: userName, score: finalScore };
  const scores = JSON.parse(localStorage.getItem("topScores")) || [];
  scores.push(newScore);
  scores.sort((a, b) => b.score - a.score); // Sort scores in descending order
  scores.splice(5); // Keep only top 5 scores

  localStorage.setItem("topScores", JSON.stringify(scores));
  displayTopScores();
}

document.getElementById("submit-score").addEventListener("click", submitScore);
// fuction to display the top 5 highscores
function displayTopScores() {
  const scores = JSON.parse(localStorage.getItem("topScores")) || [];
  const scoresList = document.getElementById("top-scores");
  scoresList.innerHTML = ""; // Clear existing list

  scores.forEach((score) => {
    const scoreElement = document.createElement("li");
    scoreElement.innerText = `${score.name}: ${score.score}`;
    scoresList.appendChild(scoreElement);
  });
}
