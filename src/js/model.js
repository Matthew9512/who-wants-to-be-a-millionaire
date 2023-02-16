import { API_LINK } from './config';
import { setUpGame, startMusic } from './controller';
import { endGameView } from './views/endView';
import { gameInterface } from './views/gameView';

export const state = {
  questionNumber: [],
  question: [],
  sortedQuestions: [],
};

// map with questions number and their difficulty
const questionDifficulty = new Map();

// setup difficulty based on question number
const addDifficulty = function (values, level) {
  values.forEach((value) => {
    questionDifficulty.set(value, level);
  });
};
addDifficulty([1, 2, 3, 4, 5], 'easy');
addDifficulty([6, 7, 8, 9, 10], 'medium');
addDifficulty([11, 12, 13, 14, 15], 'hard');

// get question difficulty for new question
const setDifficulty = function (questionNumber) {
  return `${questionDifficulty.get(questionNumber)}`;
};

// fetch new question
export const startGame = async function () {
  const welcome = document.querySelector('.welcome');
  const game = document.querySelector('.game');
  const tabel = document.querySelector('.tabel');
  const toggleTable = document.querySelector('.btn-close-table');

  const type = setDifficulty(state.questionNumber);

  try {
    const respond = await fetch(`${API_LINK}?amount=1&difficulty=${type}&type=multiple`);
    const data = await respond.json();

    state.question = data.results.map((value) => {
      return {
        correct: value.correct_answer,
        incorrect: value.incorrect_answers,
        question: value.question,
      };
    });

    welcome.classList.add('hidden');
    tabel.classList.remove('hidden');
    game.classList.remove('hidden');
    toggleTable.classList.remove('hide');

    sortAnswers();
  } catch (error) {
    console.log(error.message);
  }
};

// check if the answer is correct or not
export const checkAnswer = function (click) {
  const gamePulpitAnswer = document.querySelectorAll('.game__pulpit-answer');
  const correctAnswer = document.querySelector('#correct-answer');
  const wrongAnswer = document.querySelector('#wrong-answer');
  const backgroundMusic = document.querySelector('#background-music');
  const nextQuestion = document.querySelector('#next-question');
  const tabel = document.querySelector('.tabel');

  // correct answer
  if (click.dataset.answer === state.question.at(0).correct) {
    correctAnswer.currentTime = 0;
    // play and stop melody
    backgroundMusic.pause();
    correctAnswer.play();

    // update score
    currentScore();

    // add green(correct) background
    click.classList.add('correct');

    // update question number => add 1 for each new question
    state.questionNumber = state.questionNumber + 1;

    // deley fetching and displaying new question to match melody
    setTimeout(() => {
      startGame();
      correctAnswer.pause();
      nextQuestion.play();

      setTimeout(() => {
        startMusic();
      }, 4400);
    }, 3800);
  }

  // correct and finall answer
  if (state.questionNumber === 16) {
    etTimeout(() => {
      const gameState = 'win';
      endGameView(gameState);
      backgroundMusic.pause();
    }, 3200);
  }

  // incorrect answer
  if (click.dataset.answer !== state.question.at(0).correct) {
    gamePulpitAnswer.forEach((value) => {
      if (value.dataset.answer === state.question.at(0).correct) {
        // play and stop melody
        backgroundMusic.pause();
        wrongAnswer.play();

        // add green(correct) background
        value.classList.add('correct');
        // add incorrect(red) background
        click.classList.add('incorrect');
      }
    });
    // deley end game view to match melody
    setTimeout(() => {
      const gameState = 'lost';
      endGameView(gameState);
      tabel.classList.add('hidden');
      wrongAnswer.pause();
      backgroundMusic.pause();
      wrongAnswer.currentTime = 0;
    }, 4400);
  }
};

// sort fetched answer in random order
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

// update score
export const currentScore = function () {
  const tabelScoreItem = document.querySelectorAll('.tabel__score-item');
  tabelScoreItem.forEach((value) => {
    if (value.dataset.question == state.questionNumber + 1) {
      //
      const previousScore = tabelScoreItem[state.questionNumber - 1];

      // add class to show at which question user is
      value.classList.add('current-score');

      // add ' • ' to correct answers
      previousScore.setAttribute('data-score', ' • ');
    } else {
      // update class to show at which question user is
      value.classList.remove('current-score');
    }
  });
};

// 50/50 helper => hide two random incorrect answers
export const helperHalf = function () {
  const tabelScoreItem = [...document.querySelectorAll('.game__pulpit-answer')];
  const random = Math.floor(Math.random() * 2);

  const inncorectAnswers = tabelScoreItem.filter((value) => value.dataset.answer !== state.question.at(0).correct);

  inncorectAnswers.at(random).classList.add('half');
  inncorectAnswers.at(random + 1).classList.add('half');
};

// reset game
export const resetGame = function () {
  const tabelScoreItem = document.querySelectorAll('.tabel__score-item');
  tabelScoreItem.forEach((value) => {
    value.classList.remove('current-score');
    value.removeAttribute('data-score');
  });
  const btns = document.querySelectorAll('.btn');
  btns.forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove('half');
  });
  setUpGame();
};
// show modal with game rules
export const gameRules = function () {
  const about = document.querySelector('.about');

  about.classList.toggle('hidden');
};
