document.querySelector('#start-btn').addEventListener('click', startGame);
const questionContainer = document.querySelector('#question-container');
const nextBtn = document.querySelector('#next-btn');
const startBtn = document.querySelector('#start-btn');
const displayQuestion = document.querySelector('#question');
const answerBtns = document.querySelector('#answers');
let correctAnswers = 0;
let incorrectAnswers = 0;
const scoreContainer = document.querySelector('#score-container');
const mistakesContainer = document.querySelector('#mistakes-container');
const appInnerWrapper = document.querySelector('.app-inner-wrapper');
const wrongElement = document.querySelector('.correct-wrong');
let currentQuestionsIndex = 0;
let shuffledQuestions = 0;

const questions = [
  {
    question:
      'In the episode named "Dwight Christmas", which Christmas movie does Pete have memorized line for line?',
    answers: [
      { option: 'Die Hard', correct: true },
      { option: 'Home Alone', correct: false },
      { option: 'Devil Wears Prada', correct: false },
      { option: 'Lord of the Rings', scorrect: false },
    ],
  },
  {
    question: 'What does Prison Mike say is the worst thing about jail?',
    answers: [
      { option: 'The Food', correct: false },
      { option: 'The Showers', correct: false },
      { option: 'The Dementors', correct: true },
      { option: 'Sleepless nights', correct: false },
    ],
  },
  {
    question:
      "What does Michael offer Scott's tots when he can't pay their tuition?",
    answers: [
      { option: 'Pizza Hut discount coupons', correct: false },
      { option: 'Boxes of crayons', correct: false },
      { option: 'Calculators', correct: false },
      { option: 'Lithium batteries', correct: true },
    ],
  },
  {
    question: "What is Stanley's favorite day?",
    answers: [
      { option: 'Pay Day', correct: false },
      { option: 'Pretzel Day', correct: true },
      { option: 'Pancake Day', correct: false },
      { option: 'Casino Day', correct: false },
    ],
  },
  {
    question:
      "When Michael visits ex-girlfriend Holly's office in Nashua, what does he take as a souvenir?",
    answers: [
      { option: 'Sleeve of her sweater', correct: true },
      { option: "Holly's Woody Doll", correct: false },
      { option: 'An envelope with a letter', correct: false },
      { option: "Her fiance's picture", correct: false },
    ],
  },
  {
    question: "Which Angela's cat did Dwight put into a freezer?",
    answers: [
      { option: 'Sprinkles', correct: true },
      { option: 'Princess Lady', correct: false },
      { option: 'Bandit', correct: false },
      { option: 'Lumpy', correct: false },
    ],
  },
  {
    question: "What is the title of Michael's movie?",
    answers: [
      { option: 'Nightly Threat Mission', correct: false },
      { option: 'Midnight Mission', correct: false },
      { option: 'Night Agent Scarn', correct: false },
      { option: 'Threat Level Midnight', correct: true },
    ],
  },
  {
    question: "What is the name of Pam, Oscar and Toby's club?",
    answers: [
      { option: 'The Breakfast Club', correct: false },
      { option: 'The Fine Literature Club', correct: false },
      { option: 'The Afternoon Tea Club', correct: false },
      { option: 'The Finer Things Club', correct: true },
    ],
  },
  {
    question: "What is Dwight's all-time favorite movie?",
    answers: [
      { option: 'The Crow', correct: true },
      { option: 'Battlestar Galactica', correct: false },
      { option: 'Star Wars', correct: false },
      { option: 'Robocop', correct: false },
    ],
  },
  {
    question: 'Why was Dwight removed as safety officer?',
    answers: [
      { option: 'He gave Stanley a heart attack', correct: false },
      { option: 'He set a trashcan on fire in the office', correct: false },
      { option: "He didn't let anyone out of the office", correct: false },
      { option: 'He shot a gun at the office', correct: true },
    ],
  },
];

function startGame() {
  questionContainer.classList.remove('hide');
  startBtn.classList.add('hide');
  randomizeQuestions = questions.sort(() => Math.random() - 0.5);
  nextQuestion();
}

function nextQuestion() {
  resetState();
  showQuestion(randomizeQuestions[currentQuestionsIndex]);
}

function showQuestion(question) {
  displayQuestion.textContent = `${question.question}`;
  question.answers.forEach((answer) => {
    answerButton = document.createElement('button');
    answerButton.textContent = answer.option;
    answerButton.id = 'answer-btn';
    answerButton.classList.add('btn');
    answerBtns.appendChild(answerButton);
    if (answer.correct) {
      answerButton.dataset.correct = answer.correct;
    }
    answerButton.addEventListener('click', selectedAnswer);
  });
}

function selectedAnswer(e) {
  const selectedAnswer = e.target;
  const buttonsToDisable = document.querySelectorAll('#answer-btn');
  //Disables all answer buttons after choosing one of the answers
  for (var i = 0; i < buttonsToDisable.length; i++) {
    buttonsToDisable[i].disabled = true;
  }
  const correct = selectedAnswer.dataset.correct;
  if (correct) {
    correctAnswers++;
  } else if (!correct) {
    incorrectAnswers++;
  }
  showCorrectOrWrong(wrongElement, correct, !correct);
  displayScore();
  displayMistakes();

  if (incorrectAnswers != 3) {
    //Shows next questions; if no more questions available, shows winner window and restart button
    if (randomizeQuestions.length > currentQuestionsIndex + 1) {
      nextBtn.classList.remove('hide');
    } else {
      const winnerImage = document.createElement('img');
      winnerImage.src = '/img/winner.gif';
      document.querySelector('#loser-winner').appendChild(winnerImage);
      appInnerWrapper.classList.add('hide');
      restartGame();
    }
  }
}

function restartGame() {
  const restartButton = document.createElement('button');
  restartButton.textContent = 'Restart';
  restartButton.classList.add('btn');
  document.querySelector('#loser-winner').appendChild(restartButton);
  restartButton.addEventListener('click', () => window.location.reload());
}

function displayScore() {
  const CorrectCountID = 'score-output';
  if (document.querySelector('#score-output')) {
    document.querySelector('#score-output').remove();
  }
  const correctCount = document.createElement('div');
  correctCount.id = 'score-output';
  correctCount.textContent = `Score ${correctAnswers.toString()}`;
  correctCount.classList.add('score');
  scoreContainer.appendChild(correctCount);
}

function displayMistakes() {
  const MistakesCountID = 'mistakes-output';
  if (document.querySelector('#mistakes-output')) {
    document.querySelector('#mistakes-output').remove();
  }
  const mistakesCount = document.createElement('div');
  mistakesCount.id = 'mistakes-output';
  mistakesCount.textContent = `${incorrectAnswers.toString()}/3`;
  mistakesCount.classList.add('mistake');
  mistakesContainer.appendChild(mistakesCount);
  //When certain amount of mistakes reached - shows loser window with restart button
  if (incorrectAnswers == 3) {
    nextBtn.classList.add('hide');
    appInnerWrapper.classList.add('hide');
    const loserImage = document.createElement('img');
    loserImage.src = '/img/loser.gif';
    document.querySelector('#loser-winner').appendChild(loserImage);
    restartGame();
  }
}

function showCorrectOrWrong(element, correct, incorrect) {
  if (correct) {
    element.classList.add('correct');
  } else if (incorrect) {
    element.classList.add('wrong');
  }
}
function resetState() {
  wrongElement.classList.remove('correct');
  wrongElement.classList.remove('wrong');
  nextBtn.classList.add('hide');
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

nextBtn.addEventListener('click', () => {
  currentQuestionsIndex++;
  nextQuestion();
});
