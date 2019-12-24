// my questions
const myQuestions = [
    {
      question: "Why are dachshunds prone to back problems?",
      answers: [
          "Neither heredity nor anatomical structure",
          "Heredity",
          "Both heredity and anatomical structure",
          "Anatomical structure"
      ],
      correctAnswer: "Anatomical structure"
      },
    {
      question: "Many dog owners discuss how particular breeds have particular character traits. What is the predominant character trait of the dachshund?",
      answers: [
          "Aggression",
          "All of the choices",
          "Nervousness",
          "Stubbornness"
      ],
      correctAnswer: "Stubbornness"
    },
    {
      question: "Which of the following type of coat is NOT found in dachshunds?",
      answers: [
          "Long-haired",
          "Hairless",
          "Smooth-haired",
          "Wire-haired"
      ],
      correctAnswer: "Hairless"
    },
    {
      question: "It is commonly known that dachshunds were originally bred to hunt badgers, but what other animal were dachshunds bred to hunt?",
      answers: [
          "Raccoons",
          "Deer",
          "Wild boar",
          "Bear"
      ],
      correctAnswer: "Deer"
    },
    {
      question: "A dachshund's bark is very high pitched.",
      answers: [
          "True",
          "False"
      ],
      correctAnswer: "True"
    },
    {
      question: "Dachshunds are originally from?",
      answers: [
          "Mexico",
          "Germany",
          "Netherlands",
          "Croatia"
      ],
      correctAnswer: "Germany"
    },
    {
      question: "Dachshunds can be good with children only if they are appropriately socialized.",
      answers: [
          "True",
          "False"
      ],
      correctAnswer: "True"
    },
    {
      question: "It is possible to reduce the risk of back problems for your dachshund.",
      answers: [
          "True",
          "False"
      ],
      correctAnswer: "True"
    },
    {
      question: "A dachshund typically has a long life-span.",
      answers: [
          "True",
          "False"
      ],
      correctAnswer: "True"
    },
    {
      question: "If you adopt an older dachshund, it cannot be trained.",
      answers: [
          "True",
          "False"
      ],
      correctAnswer: "False"
    }
  ];
  
  //variables for the score and question number information
  let score = 0;
  let questionNumber = 0;
  
  //generate the questions
  function generateQuestion() {
    if (questionNumber < myQuestions.length) {
      return createThing(questionNumber);
    } else {
      $('.questionBox').hide();
      finalScore();
      $('.questionNumber').text(10);
    }
  }
  
  //increase score by 1
  //the update score text
  function updateScore() {
    score++;
    $('.score').text(score);
  }
  
  //increase question number by 1
  //the update question number text
  function updateQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
  }
  
  //reset the text for score and question number
  function resetStats() {
    score = 0;
    questionNumber = 0;
    $('.score').text(0);
    $('.questionNumber').text(0);
  }
  
  //start quiz
  function startQuiz() {
    $('.selectBox').hide();
    $('.startQuiz').on('click', '.startButton', function (event) {
      $('.startQuiz').hide();
      $('.questionNumber').text(1);
      $('.questionBox').show();
      $('.questionBox').prepend(generateQuestion());
    });
  }
  
  //submit answer and check if it's right or wrong
  function submitAnswer() {
    $('.quizBox').on('submit', function (event) {
      event.preventDefault();
      $('.selectBox').hide();
      $('.response').show();
      let selected = $('input:checked');
      let answer = selected.val();
      let correct = myQuestions[questionNumber].correctAnswer;
      if (answer === correct) {
        correctAnswer();
      } else {
        wrongAnswer();
      }
    });
  }
  
  //create question form
  function createThing(questionIndex) {
    let formMaker = $(`<form>
      <fieldset>
        <legend class="questionText">${myQuestions[questionIndex].question}</legend>
      </fieldset>
    </form>`)
  
    let fieldSelector = $(formMaker).find('fieldset');
  
    myQuestions[questionIndex].answers.forEach(function (answerValue, answerIndex) {
      $(`<label class="sizeMe" for="${answerIndex}">
          <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
          <span>${answerValue}</span>
        </label>
        `).appendTo(fieldSelector);
    });
    $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
    return formMaker;
  }
  
  //populate feedback (correct)
  //increase user score by 1
  function correctAnswer() {
    $('.response').html(
      `<h3>Your answer is correct!</h3>
      <img src="img/correct-img.jpg" alt="smart dog" class="images" width="200px">
        <p class="sizeMe">Correct!</p>
        <button type="button" class="nextButton button">Next</button>`
    );
    updateScore();
  }
  
  //populate feedback (incorrect)
  function wrongAnswer() {
    $('.response').html(
      `<h3>Sorry, that answer is wrong.</h3>
      <img src="img/wrong-img.jpg" alt="dissapointed dog" class="images" width="200px">
      <p class="sizeMe">It's actually:</p>
      <p class="sizeMe">${myQuestions[questionNumber].correctAnswer}</p>
      <button type="button" class="nextButton button">Next</button>`
    );
  }
  
  //populate next question
  function nextQuestion() {
    $('.quizBox').on('click', '.nextButton', function (event) {
      $('.selectBox').hide();
      $('.questionBox').show();
      updateQuestionNumber();
      $('.questionBox form').replaceWith(generateQuestion());
    });
  }
  
  //calculate final score and populate feedback
  function finalScore() {
    $('.final').show();
  
    const great = [
      'Great job!'
    ];
  
    const good = [
      'Good, not great.'
    ];
  
    const bad = [
      'Very Bad!'
    ];
  
    if (score >= 8) {
      array = great;
    } else if (score < 8 && score >= 5) {
      array = good;
    } else {
      array = bad;
    }
    return $('.final').html(
      `<h3>${array[0]}</h3>
          <h3>Your score is ${score} / 10</h3>
          <button type="submit" class="restartButton button">Restart</button>`
    );
  }
  
  //restart the quiz
  function restartQuiz() {
    $('.quizBox').on('click', '.restartButton', function (event) {
      event.preventDefault();
      resetStats();
      $('.selectBox').hide();
      $('.startQuiz').show();
    });
  }
  
  //run functions
  function makeQuiz() {
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
  }
  
  $(makeQuiz);