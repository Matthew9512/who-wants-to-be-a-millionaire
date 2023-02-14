import '/src/sass/styles.scss';
import { startGame, gameRules, state, checkAnswer, helperHalf } from './model';
import { endGameView } from './views/endView';

const btnStart = document.querySelector('.btn-start');
const btnHowPlay = document.querySelector('.btn-how-play');
const btnClose = document.querySelector('.btn-close');
const game = document.querySelector('.game');
const tabelHelpers = document.querySelector('.tabel__helpers');

btnStart.addEventListener('click', () => {
  const introMusic = document.querySelector('#intro-music');
  const nextQuestion = document.querySelector('#next-question');
  const backgroundMusic = document.querySelector('#background-music');
  const tabel = document.querySelector('.tabel');

  state.questionNumber = 1;

  nextQuestion.play();
  introMusic.pause();
  setTimeout(() => {
    nextQuestion.pause();
    backgroundMusic.play();
    startGame();
    tabel.classList.remove('hidden');
  }, 3000);
});

btnHowPlay.addEventListener('click', gameRules);
btnClose.addEventListener('click', gameRules);

game.addEventListener('click', (e) => {
  const click = e.target;
  if (!click.classList.contains('game__pulpit-answer')) return;
  checkAnswer(click);
});
tabelHelpers.addEventListener('click', (e) => {
  const click = e.target;
  const gameState = 'withdraw';
  if (click.classList.contains('btn-new-question')) startGame();
  if (click.classList.contains('btn-half-answers')) helperHalf();
  if (click.classList.contains('btn-widthraw')) endGameView(gameState);
  click.disabled = true;
  click.classList.add('half');
});
