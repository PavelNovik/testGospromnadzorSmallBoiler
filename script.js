'use strict';

// Importing const
import { kotelnQuest } from './koteln.js';
import { gazQuest } from './gaz.js';

// add music
const audioMusic = document.querySelector('audio');
audioMusic.volume = 0.03;
const musicStop = document.querySelector('.fa-volume-mute');
const musicPlay = document.querySelector('.fa-volume-up');
musicStop.addEventListener('click', function () {
  audioMusic.muted = true;
});
musicPlay.addEventListener('click', function () {
  audioMusic.muted = false;
});

// Seting the elements of web
// Text menu in the Header
const howManyQuestions = document.querySelector('.allQuest');
const howManyTrue = document.querySelector('.trueQuest');
const howManyFalse = document.querySelector('.falseQuest');

// The theme
const mainTheme = document.querySelector('.main__theme');

// Information block
const infoField = document.querySelector('.header__info');
const questNum = document.querySelector('.quest__current_num');
const checkAnsw = document.querySelector('.quest__check');

// Question Block
const numsField = document.querySelector('.quest__nums');
const currentQuestion = document.querySelector('.quest__text_block');
const answerOne = document.querySelector('.answ__one_text');
const answerTwo = document.querySelector('.answ__two_text');
const answerThree = document.querySelector('.answ__three_text');

// const allSymbls = document.querySelectorAll('.symb');
const allLabels = document.querySelectorAll('label');
const answerTextBlock = document.querySelector('.answer__text');

const inputs = document.querySelectorAll('input');

const comentRule = document.querySelector('.rule__link');
const trueAnswer = document.querySelector('.true__answer');

// Form
const answerForm = document.querySelector('form');

// All buttons
const checkBtn = document.querySelector('.btn__check');
const prewiousBtn = document.querySelector('.btn__previous_quest');
const nextBtn = document.querySelector('.btn__next_quest');

// Form
// const answerCallBack = document.querySelector('.answer__list');
let numberOfTrueAnswer = 0;
let numberOfFalseAnswer = 0;
let i = 0;

// Print Nums block
function printNums() {
  for (let i = 0; i < kotelnQuest.length; i++) {
    numsField.insertAdjacentHTML(
      'beforeend',
      `<div class="num">${i + 1}</div>`
    );
  }
  const divs = document.querySelectorAll('.num');
  return divs;
}

const allNumDivs = printNums();

// newLook function
function newLookPage() {
  for (let i = 0; i < kotelnQuest.length; i++) {
    if (kotelnQuest[i].answerUser) {
      if (kotelnQuest[i].answerUser === kotelnQuest[i].answerTrue) {
        allNumDivs[i].classList.add('num__true');
      } else allNumDivs[i].classList.add('num__false');
    }
  }
  // 01.06.2020 year changed
  if (kotelnQuest[i].answerUser) {
    inputs[kotelnQuest[i].answerUser - 1].checked = true;
  }
}

function startTest(questions, i) {
  infoField.textContent = '???????????????????? ?? ???????????????? ????????????: ';
  howManyQuestions.textContent = questions.length;

  questNum.textContent = i + 1;
  howManyTrue.textContent = numberOfTrueAnswer;
  howManyFalse.textContent = numberOfFalseAnswer;
  questNum.textContent = i + 1;
  checkAnsw.style.opacity = 0;
  currentQuestion.textContent = questions[i].questText;
  // ?????????????????????????? ?????????????????? ?????????????? ?????????????? ???? ???????????? 01.06.2022
  // let randomQuest = randomiser();

  // answerOne.textContent = questions[i].answers[randomQuest[0]];
  // answerTwo.textContent = questions[i].answers[randomQuest[1]];
  // answerThree.textContent = questions[i].answers[randomQuest[2]];
  // for (let n = 0; n <= 2; n++) {
  //   inputs[n].value = randomQuest[n] + 1;
  // }
  answerOne.textContent = questions[i].answers[0];
  answerTwo.textContent = questions[i].answers[1];
  answerThree.textContent = questions[i].answers[2];

  document.querySelectorAll('.symb').forEach((symb) => symb.remove());
  // allSymbls.forEach(symbl => (symbl.style.opacity = 0));
  comentRule.textContent = questions[i].answerComment;
  trueAnswer.textContent = questions[i].answers[questions[i].answerTrue - 1];
  answerTextBlock.style.opacity = 0;
  allNumDivs[i].classList.add('current');
}

function starterTest(questions, i) {
  if (i === 0) {
    startTest(questions, i);
    prewiousBtn.style.opacity = 0;
  } else if (i === questions.length) {
    infoField.textContent = '???????????????? ???????????? ????????????????. ???????? ????????????????????:';
    nextBtn.style.opacity = 0;
  } else {
    startTest(questions, i);
    prewiousBtn.style.opacity = 100;
    nextBtn.style.opacity = 100;
  }
}
starterTest(kotelnQuest, i);

function checkResult(userAnswer) {
  if (userAnswer) {
    if (!kotelnQuest[i].answerUser) {
      kotelnQuest[i].answerUser = userAnswer;
    }
    if (userAnswer === kotelnQuest[i].answerTrue) {
      numberOfTrueAnswer++;
      checkAnsw.textContent = '??????????';
      checkAnsw.style.opacity = 100;
      answerTextBlock.style.opacity = 100;
      allLabels[userAnswer - 1].insertAdjacentHTML(
        'beforeend',
        `<span class="symb symb__two answ__true ">&#10004</span>`
      );
    } else {
      numberOfFalseAnswer++;
      checkAnsw.textContent = '???? ??????????';
      checkAnsw.style.opacity = 100;
      answerTextBlock.style.opacity = 100;
      allLabels[userAnswer - 1].insertAdjacentHTML(
        'beforeend',
        `<span class="symb symb__three answ__false">&#10006</span>`
      );
    }
    newLookPage();
    inputs.forEach((input) => input.setAttribute('disabled', true));
    checkBtn.setAttribute('disabled', true);
  }
}

answerForm.addEventListener('submit', function (e) {
  let data = new FormData(answerForm);
  let userAnswer;
  for (let entry of data) {
    userAnswer = Number(entry[1]);
  }
  e.preventDefault();
  // inputs.forEach(input => input.setAttribute('disabled', true));
  // checkBtn.setAttribute('disabled', true);
  checkResult(userAnswer);
});

nextBtn.addEventListener('click', function (e) {
  e.preventDefault;
  allNumDivs[i].classList.remove('current');
  i++;
  // starterTest(kotelnQuest, i);
  // inputs.forEach(input => {
  //   input.removeAttribute('disabled');
  //   input.checked = false;
  // });
  // checkBtn.removeAttribute('disabled');
  nextQuestion();
});

prewiousBtn.addEventListener('click', function (e) {
  e.preventDefault;
  allNumDivs[i].classList.remove('current');
  i--;
  // starterTest(kotelnQuest, i);
  // inputs.forEach(input => {
  //   input.removeAttribute('disabled');
  //   input.checked = false;
  // });
  // checkBtn.removeAttribute('disabled');
  nextQuestion();
});

// ?????????????????????????? ?????????????????? ?????????? ???????????? ?? ???????????? ????????????????
function nextQuestion() {
  starterTest(kotelnQuest, i);
  inputs.forEach((input) => {
    input.removeAttribute('disabled');
    input.checked = false;
  });
  checkBtn.removeAttribute('disabled');
  checkResult(kotelnQuest[i].answerUser);
}

// ?????????????????????????? ?????????????????? ???? ???????????????? ?? ???????????? ???????? 30.05.2022
allNumDivs.forEach((numDiv) =>
  numDiv.addEventListener('click', function (e) {
    // console.log(e);
    allNumDivs[i].classList.remove('current');
    i = Number(numDiv.textContent - 1);
    console.log(i);
    nextQuestion();
  })
);

// ?????????????????????????? ???????????????????? ????????????
function randomiser() {
  let randInd = [];
  let cycle = 0;
  const randomCount = () => Math.floor(Math.random() * 3);
  while (cycle < 3) {
    let x = randomCount();
    if (!randInd.includes(x)) {
      randInd.push(x);
      cycle++;
    }
  }
  return randInd;
}
// randomiser();
