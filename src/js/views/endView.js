import { resetGame, state } from '../model';

export const endGameView = function (gameState) {
  const game = document.querySelector('.game__pulpit');
  const tabelScoreItem = document.querySelectorAll('.tabel__score-item');

  if (gameState === 'win')
    game.innerHTML = `Congrats, you made it you won 1,000,000$
  <button class="btn btn-new-game">Start game</button>`;

  if (gameState === 'lost' || 'withdraw') {
    tabelScoreItem.forEach((value) => {
      if (value.dataset.question == state.questionNumber - 1)
        game.innerHTML = `Unfortunately its a wrong answer, but dont give up no one said its gonna be easy ;) Hey we have good news, you won ${value.innerHTML}$
        <button class="btn btn-new-game">Start game</button>`;
      if (value.dataset.question == 1)
        game.innerHTML = `Unfortunately its a wrong answer, but dont give up no one said its gonna be easy ;)
        <button class="btn btn-new-game">Start game</button>`;
    });
  }
  const btnStartt = document.querySelector('.btn-new-game');

  btnStartt.addEventListener('click', resetGame);
};
