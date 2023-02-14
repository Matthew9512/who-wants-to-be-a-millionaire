import { state } from '../model';

export const gameInterface = function () {
  const game = document.querySelector('.game__pulpit');
  console.log(state.question);

  game.innerHTML = '';

  const html = `
      <p class="game__pulpit-question">${state.question.at(0).question}</p>
      <p class="game__pulpit-answer right" data-answer="${state.sortedQuestions.at(0)}">A: ${state.sortedQuestions.at(0)}</p>
      <p class="game__pulpit-answer left" data-answer="${state.sortedQuestions.at(1)}">B: ${state.sortedQuestions.at(1)}</p>
      <p class="game__pulpit-answer right" data-answer="${state.sortedQuestions.at(2)}">C: ${state.sortedQuestions.at(2)}</p>
      <p class="game__pulpit-answer left" data-answer="${state.sortedQuestions.at(3)}">D: ${state.sortedQuestions.at(3)}</p>`;
  game.insertAdjacentHTML('afterbegin', html);
};
