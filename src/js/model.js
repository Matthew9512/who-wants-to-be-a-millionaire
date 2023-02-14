import { API_LINK } from './config';
import { endGameView } from './views/endView';
import { gameInterface } from './views/gameView';

export const state = {
  questionNumber: [],
  question: [],
  sortedQuestions: [],
};

const questionDifficulty = new Map();

//
const addDifficulty = function (values, level) {
  values.forEach((value) => {
    questionDifficulty.set(value, level);
  });
};
addDifficulty([1, 2, 3, 4, 5], 'easy');
addDifficulty([6, 7, 8, 9, 10], 'medium');
addDifficulty([11, 12, 13, 14, 15], 'hard');

//
const setDifficulty = function (questionNumber) {
  return `${questionDifficulty.get(questionNumber)}`;
};

//
export const startGame = async function () {
  const welcome = document.querySelector('.welcome');
  const game = document.querySelector('.game');

  const type = setDifficulty(state.questionNumber);

  try {
    const respond = await fetch(`${API_LINK}?amount=1&difficulty=${type}&type=multiple`);
    const data = await respond.json();
    // console.log(data);
    state.question = data.results.map((value) => {
      return {
        correct: value.correct_answer,
        incorrect: value.incorrect_answers,
        question: value.question,
      };
    });

    welcome.classList.add('hidden');
    game.classList.remove('hidden');

    sortAnswers();
  } catch (error) {
    // console.log(error.message);
  }
};

//
export const checkAnswer = function (click) {
  const gamePulpitAnswer = document.querySelectorAll('.game__pulpit-answer');
  const correctAnswer = document.querySelector('#correct-answer');
  const wrongAnswer = document.querySelector('#wrong-answer');
  const backgroundMusic = document.querySelector('#background-music');
  const nextQuestion = document.querySelector('#next-question');

  if (click.dataset.answer === state.question.at(0).correct) {
    // play song for corret answer
    backgroundMusic.pause();
    correctAnswer.currentTime = 0;
    nextQuestion.currentTime = 0;
    correctAnswer.play();

    currentScore();

    click.classList.add('correct');
    state.questionNumber = state.questionNumber + 1;
    setTimeout(() => {
      startGame();
      correctAnswer.pause();
      nextQuestion.play();
      setTimeout(() => {
        nextQuestion.pause();
        backgroundMusic.play();
      }, 4400);
    }, 3800);
  }
  //
  if (state.questionNumber === 16) {
    const gameState = 'win';
    endGameView(gameState);
  }
  //
  if (click.dataset.answer !== state.question.at(0).correct) {
    gamePulpitAnswer.forEach((value) => {
      if (value.dataset.answer === state.question.at(0).correct) {
        // play song for wrong answer
        backgroundMusic.pause();
        wrongAnswer.play();
        value.classList.add('correct');
        click.classList.add('incorrect');
        const gameState = 'lost';
        endGameView(gameState);
      }
    });
  }
};

//
export const sortAnswers = function () {
  const { correct, incorrect } = state.question.at(0);

  const answersArray = [correct, ...incorrect];

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  for (let i = answersArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = answersArray[i];
    answersArray[i] = answersArray[j];
    answersArray[j] = temp;

    state.sortedQuestions = answersArray;
  }
  gameInterface();
};

//
const currentScore = function () {
  const tabelScoreItem = document.querySelectorAll('.tabel__score-item');
  tabelScoreItem.forEach((value) => {
    if (value.dataset.question == state.questionNumber) {
      value.classList.add('current-score');
      value.setAttribute('data-score', ' • ');
    } else {
      value.classList.remove('current-score');
    }
  });
};

//
export const helperHalf = function () {
  const tabelScoreItem = [...document.querySelectorAll('.game__pulpit-answer')];
  // const btnHalfAnswers = document.querySelector('.btn-half-answers');
  const random = Math.floor(Math.random() * 2);

  //
  const inncorectAnswers = tabelScoreItem.filter((value) => value.dataset.answer !== state.question.at(0).correct);

  inncorectAnswers.at(random).classList.add('half');
  inncorectAnswers.at(random + 1).classList.add('half');
};

//
export const gameRules = function () {
  const about = document.querySelector('.about');

  about.classList.toggle('hidden');
};
