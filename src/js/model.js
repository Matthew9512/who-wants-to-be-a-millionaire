import { API_LINK } from './config';
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
addDifficulty([6, 7, 8, 9], 'medium');
addDifficulty([10, 11, 12], 'hard');

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
    // gameInterface();
  } catch (error) {
    // console.log(error.message);
  }
};

//
export const checkAnswer = function (click) {
  const gamePulpitAnswer = document.querySelectorAll('.game__pulpit-answer');

  if (click.dataset.answer === state.question.at(0).correct) {
    click.classList.add('correct');
    state.questionNumber = state.questionNumber + 1;
    startGame();
  }
  //
  else {
    gamePulpitAnswer.forEach((value) => {
      if (value.dataset.answer === state.question.at(0).correct) {
        value.classList.add('correct');
        click.classList.add('incorrect');
        // display modal?
      }
    });
  }
  // if (click.dataset.answer === 'correct') {
  //   click.classList.add('correct');
  //   state.questionNumber = state.questionNumber + 1;
  //   startGame();
  //   // load next question and update question number
  // }
  // //
  // if (click.dataset.answer === 'incorrect') {
  //   gamePulpitAnswer.forEach((value) => {
  //     if (value.dataset.answer === 'correct') {
  //       value.classList.add('correct');
  //       click.classList.add('incorrect');
  //     }
  //   });
  // }
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
export const gameRules = function () {
  const about = document.querySelector('.about');

  about.classList.toggle('hidden');
};
