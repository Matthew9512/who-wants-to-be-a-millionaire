import { state } from '../model';

export const endGameView = function (gameState) {
  const game = document.querySelector('.game__pulpit');
  const tabelScoreItem = document.querySelectorAll('.tabel__score-item');

  if (gameState === 'win') game.textContent = `congrats you won 1,000,000`;

  if (gameState === 'lost' || 'withdraw') {
    tabelScoreItem.forEach((value) => {
      if (value.dataset.question == state.questionNumber - 1) game.textContent = `sorry you lost but won ${value.textContent}`;
    });
  }
};
