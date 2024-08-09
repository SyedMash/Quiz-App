type Answers = { option: string; isCorrest: boolean };
interface Questions {
  question: string;
  answers: Answers[];
}

const questions: Questions[] = [
  {
    question: "What is the capital city of France?",
    answers: [
      { option: "Berlin", isCorrest: false },
      { option: "Madrid", isCorrest: false },
      { option: "Paris", isCorrest: true },
      { option: "Rome", isCorrest: false },
    ],
  },
  {
    question: 'Who wrote the play "Romeo and Juliet"?',
    answers: [
      { option: "William Wordsworth", isCorrest: false },
      { option: "Jane Austen", isCorrest: false },
      { option: "Charles Dickens", isCorrest: false },
      { option: "William Shakespeare", isCorrest: true },
    ],
  },
  {
    question: " What is the largest planet in our solar system?",
    answers: [
      { option: "Earth", isCorrest: false },
      { option: "Jupiter", isCorrest: true },
      { option: "Mars", isCorrest: false },
      { option: "Saturn", isCorrest: false },
    ],
  },
  {
    question: "What's the chemical symbol for the gold?",
    answers: [
      { option: "Ag", isCorrest: false },
      { option: "Au", isCorrest: true },
      { option: "Pb", isCorrest: false },
      { option: "Fe", isCorrest: false },
    ],
  },
  {
    question:
      "Which element is essential for the production of nuclear energy and weapons?",
    answers: [
      { option: "Hydrogen", isCorrest: false },
      { option: "Uranium", isCorrest: true },
      { option: "Carbon", isCorrest: false },
      { option: "Nitrogen", isCorrest: false },
    ],
  },
];

const Q = document.querySelector("#question") as HTMLHeadingElement;
const answersContainer = document.querySelector("#answers") as HTMLDivElement;
const nextButton = document.querySelector("#nextButton") as HTMLButtonElement;
const Timer = document.querySelector("#Timer") as HTMLHeadingElement;
let currentIndex: number = 0;
let score: number = 0;
let start: number = 10;
let interval: number;

function startQuiz() {
  currentIndex = 0;
  score = 0;
  start = 10;
  Timer.innerHTML = String(start);
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  reset();
  handleTimer();
  let currentObject = questions[currentIndex];
  let questionNo = currentIndex + 1;
  Q.innerHTML = `${questionNo}. ${currentObject.question}`;

  currentObject.answers.forEach((e) => {
    let button = document.createElement("button");
    button.innerHTML = e.option;
    button.classList.add("btn");
    answersContainer.appendChild(button);

    if (e.isCorrest === true) {
      button.dataset.isCorrest = String(e.isCorrest);
    }

    button.addEventListener("click", (event) => {
      const eachButton = event.target as HTMLButtonElement;
      if (eachButton.dataset.isCorrest === "true") {
        eachButton.classList.add("correct");
        score++;
      } else {
        eachButton.classList.add("incorrect");
      }

      Array.from(answersContainer.children).forEach((e) => {
        const trueButton = e as HTMLButtonElement;
        if (trueButton.dataset.isCorrest === "true") {
          trueButton.classList.add("correct");
        }
        trueButton.disabled = true;
      });
      nextButton.style.display = "block";
      clearInterval(interval);
    });
  });
}

function reset() {
  nextButton.style.display = "none";
  while (answersContainer.firstChild) {
    answersContainer.removeChild(answersContainer.firstChild);
  }
}

function showNextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  reset();
  Q.innerHTML = `Your score is ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function changeQuestion(): void {
  if (currentIndex < questions.length) {
    showNextQuestion();
  } else {
    startQuiz();
  }
}

function handleTimer() {
  start = 10;
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    if (start > 0) {
      start--;
      Timer.innerHTML = String(start);
    } else {
      clearInterval(interval);
      changeQuestionOnTImeEnd();
    }
  }, 1000);
}

function changeQuestionOnTImeEnd() {
  if (currentIndex < questions.length) {
    showNextQuestion();
  } else {
    showScore();
  }
}

startQuiz();