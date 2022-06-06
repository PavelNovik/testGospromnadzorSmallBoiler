'use strict';
// Importing const
import { kotelnQuest } from './koteln.js';
import { gazQuest } from './gaz.js';

// add music

// const audioMusic = document.querySelector('audio');
// audioMusic.volume = 0.03;
// const musicStop = document.querySelector('.fa-volume-mute');
// const musicPlay = document.querySelector('.fa-volume-up');
// musicStop.addEventListener('click', function() {
//   audioMusic.muted = true
// })
// musicPlay.addEventListener('click', function () {
// audioMusic.muted = false;
// })

// console.log(audioMusic.volume);

// console.log(kotelnQuest);
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
const answers = document.querySelectorAll('.answs__text');
const answerOne = document.querySelector('.answ__one_text');
const answerTwo = document.querySelector('.answ__two_text');
const answerThree = document.querySelector('.answ__three_text');
// const allSymbls = document.querySelectorAll('.symb');
const allLabels = document.querySelectorAll('label');
const answOneSymb = document.querySelector('.symb__one');
const answTwoSymb = document.querySelector('.symb__two');
const answThreeSymb = document.querySelector('.symb__three');
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

// Numbers of answers
const numberOfAnswer = ['One', 'Two', 'Three'];
// Form
// const answerCallBack = document.querySelector('.answer__list');

// console.log(checkBtn);
// console.log(document.forms.answers[1]);
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

// В функцию ниже необходимо внести изменения для отрисовки разагданной страницы

function startTest(questions, i) {
  infoField.textContent = 'Подготовка к проверке знаний: ';
  howManyQuestions.textContent = questions.length;

  questNum.textContent = i + 1;
  howManyTrue.textContent = numberOfTrueAnswer;
  howManyFalse.textContent = numberOfFalseAnswer;
  questNum.textContent = i + 1;
  checkAnsw.style.opacity = 0;
  currentQuestion.textContent = questions[i].questText;
  // let ind = randomiser();
  // for (let n = 0; n <= 2; n++) {
  //   answers[n].textContent = questions[i].answers[ind[n]];
  //   inputs[n].value = ind[n] + 1;
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
    infoField.textContent = 'Проверка знаний окончена. Ваши результаты:';
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
      checkAnsw.textContent = 'Верно';
      checkAnsw.style.opacity = 100;
      answerTextBlock.style.opacity = 100;
      allLabels[userAnswer - 1].insertAdjacentHTML(
        'beforeend',
        `<span class="symb symb__two answ__true ">&#10004</span>`
      );
    } else {
      numberOfFalseAnswer++;
      checkAnsw.textContent = 'Не верно';
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
  //   console.log(userAnswer);
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

// Имплементация включения радио кнопок и кнопки проверки

function nextQuestion() {
  starterTest(kotelnQuest, i);
  inputs.forEach((input) => {
    input.removeAttribute('disabled');
    input.checked = false;
  });
  checkBtn.removeAttribute('disabled');
  checkResult(kotelnQuest[i].answerUser);
}

// Имплементация навигации по вопросам в правом поле 30.05.2022

allNumDivs.forEach((numDiv) =>
  numDiv.addEventListener('click', function (e) {
    // console.log(e);
    allNumDivs[i].classList.remove('current');
    i = Number(numDiv.textContent - 1);
    console.log(i);
    nextQuestion();
  })
);

// Имплементация рандомного ответа

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
