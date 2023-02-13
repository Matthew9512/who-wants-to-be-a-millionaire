import { state } from '../model';

export const gameInterface = function () {
  const game = document.querySelector('.game');
  console.log(state.question);

  game.innerHTML = '';

  const html = `
      <div class="game__pulpit">
        <p class="game__pulpit-question">${state.question.at(0).question}</p>
        <p class="game__pulpit-answer right" data-answer="${state.sortedQuestions.at(0)}">A: ${state.sortedQuestions.at(0)}</p>
        <p class="game__pulpit-answer left" data-answer="${state.sortedQuestions.at(1)}">B: ${state.sortedQuestions.at(1)}</p>
        <p class="game__pulpit-answer right" data-answer="${state.sortedQuestions.at(2)}">C: ${state.sortedQuestions.at(2)}</p>
        <p class="game__pulpit-answer left" data-answer="${state.sortedQuestions.at(3)}">D: ${state.sortedQuestions.at(3)}</p>
    </div>`;
  game.insertAdjacentHTML('afterbegin', html);

  // for (const value of state.question) {
  //   const html = `
  //     <div class="game__pulpit">
  //       <p class="game__pulpit-question">${value.question}</p>
  //       <p class="game__pulpit-answer right" data-answer="correct">A: ${value.correct}</p>
  //       <p class="game__pulpit-answer left" data-answer="incorrect">B: ${value.incorrect.at(0)}</p>
  //       <p class="game__pulpit-answer right" data-answer="incorrect">C: ${value.incorrect.at(1)}</p>
  //       <p class="game__pulpit-answer left" data-answer="incorrect">D: ${value.incorrect.at(2)}</p>
  //   </div>`;
  //   game.insertAdjacentHTML('afterbegin', html);
  // }
};
