import '/src/sass/styles.scss';
import { startGame, gameRules, state, checkAnswer, helperHalf } from './model';
import { endGameView } from './views/endView';

const btnStart = document.querySelector('.btn-start');
const btnHowPlay = document.querySelector('.btn-how-play');
const btnClose = document.querySelector('.btn-close');
const game = document.querySelector('.game');
const tabel = document.querySelector('.tabel');
const btnCloseTable = document.querySelector('.btn-close-table');
const btnMute = document.querySelector('.btn-mute');

// start new game
export const setUpGame = function () {
  const introMusic = document.querySelector('#intro-music');
  const nextQuestion = document.querySelector('#next-question');

  state.questionNumber = 1;

  nextQuestion.play();
  introMusic.pause();

  startGame();

  setTimeout(() => {
    startMusic();
  }, 3000);
};

// start backgroundMusic, reset next question time
export const startMusic = function () {
  const nextQuestion = document.querySelector('#next-question');
  const backgroundMusic = document.querySelector('#background-music');

  nextQuestion.pause();
  backgroundMusic.play();

  nextQuestion.currentTime = 0;
};

// hide/show table
const toggleTable = function () {
  if (tabel.classList.contains('hidden')) btnCloseTable.textContent = `Hide table`;
  else btnCloseTable.textContent = `Show table`;
  tabel.classList.toggle('hidden');
};

// mute music
const muteMusic = function () {
  const music = document.querySelectorAll('audio');
  music.forEach((value) => {
    if (value.muted) {
      value.muted = false;
      btnMute.innerHTML = `<i class="fa-solid fa-volume-off"></i>`;
    } else {
      value.muted = true;
      btnMute.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    }
  });
};

// event listeners
btnStart.addEventListener('click', setUpGame);
btnHowPlay.addEventListener('click', gameRules);
btnClose.addEventListener('click', gameRules);

// event listener for answers
game.addEventListener('click', (e) => {
  const click = e.target;
  if (!click.classList.contains('game__pulpit-answer')) return;
  checkAnswer(click);
});

// event listener for helpers btns
tabel.addEventListener('click', (e) => {
  const click = e.target;
  const gameState = 'withdraw';
  if (click.classList.contains('btn-new-question')) startGame();
  if (click.classList.contains('btn-half-answers')) helperHalf();
  if (click.classList.contains('btn-widthraw')) endGameView(gameState);

  // disable used helper btn
  click.disabled = true;
  click.classList.add('half');
});
btnCloseTable.addEventListener('click', toggleTable);
btnMute.addEventListener('click', muteMusic);
