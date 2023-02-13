import '/src/sass/styles.scss';
import { startGame, gameRules, state, checkAnswer } from './model';

const btnStart = document.querySelector('.btn-start');
const btnHowPlay = document.querySelector('.btn-how-play');
const btnClose = document.querySelector('.btn-close');
const game = document.querySelector('.game');

btnStart.addEventListener('click', () => {
  state.questionNumber = 1;
  startGame();
});
btnHowPlay.addEventListener('click', gameRules);
btnClose.addEventListener('click', gameRules);
game.addEventListener('click', (e) => {
  const click = e.target;
  if (!click.classList.contains('game__pulpit-answer')) return;
  checkAnswer(click);
});
