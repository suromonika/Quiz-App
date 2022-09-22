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
    question: 'What is 5 + 9?',
    answers: [
      { option: 14, correct: true },
      { option: 5, correct: false },
      { option: 69, correct: false },
      { option: 420, correct: false },
    ],
  },
  {
    question: 'What is 2 * 12?',
    answers: [
      { option: 24, correct: true },
      { option: 5, correct: false },
      { option: 69, correct: false },
      { option: 420, correct: false },
    ],
  },
];

function startGame() {
  questionContainer.classList.remove('hide');
  nextBtn.classList.remove('hide');
  startBtn.classList.add('hide');
  randomizeQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionsIndex = 0;
  nextQuestion();
}

function nextQuestion() {
  showQuestion(randomizeQuestions[currentQuestionsIndex]);
}

function showQuestion(question) {
  displayQuestion.textContent = `${question.question}`;
  question.answers.forEach((answer) => {
    answerButton = document.createElement('button');
    answerButton.textContent = answer.option;
    answerButton.classList.add('btn');
    answerBtns.appendChild(answerButton);
    if (answer.correct) {
      answerButton.dataset.correct = answer.correct;
    }
    answerButton.addEventListener('click', selectedAnswer);
  });
}

const wrongElement = document.querySelector('.correct-wrong');

function selectedAnswer(e) {
  const selectedAnswer = e.target;
  const correct = selectedAnswer.dataset.correct;
  const incorrect = selectedAnswer.dataset.correct;
  if (correct) {
    correctAnswers++;
  } else if (!correct) {
    incorrectAnswers++;
  }
  showCorrectOrWrong(wrongElement, correct, incorrect);
  const CorrectCountID = 'score-output';
  if (document.querySelector('#score-ouput')) {
    document.querySelector('#score-output').remove();
  }
  const correctCount = document.createElement('div');
  correctCount.id = 'score-output';
  correctCount.textContent = correctAnswers.toString();
  correctCount.classList.add('score');
  scoreContainer.appendChild(correctCount);

  incorrectCount = document.createElement('div');
  incorrectCount.textContent = incorrectAnswers.toString();
  incorrectCount.classList.add('mistake');
  mistakesContainer.appendChild(incorrectCount);
}

function showCorrectOrWrong(element, correct, incorrect) {
  if (correct) {
    element.classList.add('correct');
  } else if (incorrect) {
    element.classList.add('wrong');
  }
}

// nextBtn.addEventListener('click');
