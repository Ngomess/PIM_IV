const questions = [

  {
    question: "Qual palavra-chave ou símbolo é utilizado em C# para indicar que uma classe herda de outra?",
    answers: [
      "extends",
      "inherits",
      ": (dois pontos)",
      "base"
    ],
    correct: 2
  },

  {
    question: "Em C#, qual modificador deve ser usado na classe base para permitir que um método seja sobrescrito?",
    answers: [
      "override",
      "virtual",
      "abstract",
      "static"
    ],
    correct: 1
  },

  {
    question: "Qual modificador restringe acesso à própria classe e derivadas?",
    answers: [
      "private",
      "public",
      "protected",
      "internal"
    ],
    correct: 2
  },

  {
    question: "Sobre interfaces em C#, qual alternativa está correta?",
    answers: [
      "Uma classe implementa apenas uma interface",
      "Interfaces não definem métodos",
      "Uma classe pode implementar múltiplas interfaces",
      "Interfaces não herdam interfaces"
    ],
    correct: 2
  },

  {
    question: "O que acontece ao instanciar uma classe abstrata?",
    answers: [
      "Objeto é criado normalmente",
      "Compilador gera erro",
      "Atributos ficam nulos",
      "Exceção em runtime"
    ],
    correct: 1
  },

  {
    question: "Qual o principal propósito de propriedades get e set?",
    answers: [
      "Impedir herança",
      "Permitir herança múltipla",
      "Controlar acesso aos campos privados",
      "Substituir construtores"
    ],
    correct: 2
  },

  {
    question: "Métodos com mesmo nome e assinaturas diferentes é chamado de:",
    answers: [
      "Overriding",
      "Overloading",
      "Shadowing",
      "Encapsulamento"
    ],
    correct: 1
  },

  {
    question: "Como chamar o construtor da classe base?",
    answers: [
      "super()",
      "parent()",
      ": base()",
      "base.Constructor()"
    ],
    correct: 2
  },

  {
    question: "O que a palavra-chave this representa?",
    answers: [
      "Classe pai",
      "A própria instância atual",
      "Variável global",
      "Interface principal"
    ],
    correct: 1
  },

  {
    question: "Qual característica define um membro static?",
    answers: [
      "Pertence à instância",
      "Exige objeto",
      "Pertence à classe",
      "É imutável"
    ],
    correct: 2
  }

];

let currentQuestion = 0;
let score = 0;

const questionText =
  document.getElementById("questionText");

const answersForm =
  document.getElementById("answersForm");

const nextButton =
  document.getElementById("nextButton");

const questionNumber =
  document.getElementById("questionNumber");

const progressText =
  document.getElementById("progressText");

const progressFill =
  document.getElementById("progressFill");

const scoreText =
  document.getElementById("scoreText");

const questionsStatus =
  document.getElementById("questionsStatus");

const questionResults =
  Array(questions.length).fill(null);

/* LOAD QUESTION */

function loadQuestion() {

  const current =
    questions[currentQuestion];

  questionText.textContent =
    current.question;

  questionNumber.textContent =
    currentQuestion + 1;

  progressText.textContent =
    `Questão ${currentQuestion + 1} de ${questions.length}`;

  progressFill.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  answersForm.innerHTML = "";

  current.answers.forEach((answer, index) => {

    const label =
      document.createElement("label");

    label.classList.add("answer-option");

    label.innerHTML = `
      <input
        type="radio"
        name="answer"
        value="${index}"
      >

      ${answer}
    `;

    answersForm.appendChild(label);

  });

  /* ALTERA TEXTO DO BOTÃO */

  if (
    currentQuestion ===
    questions.length - 1
  ) {

    nextButton.textContent =
      "Finalizar Simulado";

  }

  else {

    nextButton.textContent =
      "Próxima Questão";

  }
  
  renderSidebar();

}

/* SIDEBAR */

function renderSidebar() {

  questionsStatus.innerHTML = "";

  questions.forEach((question, index) => {

    const item =
      document.createElement("div");

    item.classList.add(
      "question-status-item"
    );

    let icon = "radio_button_unchecked";

    if (
      questionResults[index] === true
    ) {

      item.classList.add(
        "status-correct"
      );

      icon = "check_circle";

    }

    else if (
      questionResults[index] === false
    ) {

      item.classList.add(
        "status-wrong"
      );

      icon = "cancel";

    }

    else if (
      index === currentQuestion
    ) {

      item.classList.add(
        "status-current"
      );

      icon = "play_circle";

    }

    else {

      item.classList.add(
        "status-pending"
      );

    }

    item.innerHTML = `

      <span
        class="material-symbols-outlined question-status-icon"
      >
        ${icon}
      </span>

      <span>
        Questão ${index + 1}
      </span>

    `;

    questionsStatus.appendChild(item);

  });

}

/* NEXT BUTTON */

nextButton.addEventListener("click", (event) => {

  event.preventDefault();

  const selected =
    document.querySelector(
      'input[name="answer"]:checked'
    );

  if (!selected) {

    alert("Selecione uma alternativa.");

    return;

  }

  const answer =
    Number(selected.value);

  const isCorrect =
    answer ===
    questions[currentQuestion].correct;

  questionResults[currentQuestion] =
    isCorrect;

  if (isCorrect) {

    score++;

  }

  scoreText.textContent =
    `${score} acertos`;

  currentQuestion++;

  if (
    currentQuestion <
    questions.length
  ) {

    loadQuestion();

  }

  else {

    showResult();

  }

});

/* RESULT */

function showResult() {

  const percentage =
    (score / questions.length) * 100;

/* SALVA RESULTADO */

const finalGrade =
  ((score / questions.length) * 10)
  .toFixed(1);

localStorage.setItem(
  "studentGrade",
  finalGrade
);

localStorage.setItem(
  "studentHits",
  score
);

localStorage.setItem(
  "studentPercentage",
  percentage.toFixed(0)
);

  document.querySelector(".quiz-card")
    .innerHTML = `

      <div class="result-screen">

        <h2>
          Simulado Finalizado
        </h2>

        <p>
          Você acertou
          ${score}
          de
          ${questions.length}
          questões.
        </p>

        <h3>
          ${percentage.toFixed(0)}%
        </h3>

      </div>

    `;

  renderSidebar();

}

loadQuestion();