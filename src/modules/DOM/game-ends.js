/* eslint-disable no-undef */
import players from "./make-players";

function showModal() {
  const modal = document.querySelector("dialog");
  modal.showModal();
}

function hideModal() {
  const modal = document.querySelector("dialog");
  modal.close();
}

function resetPlayersBoards() {
  players[0].board = new GameBoard();
  players[1].board = new GameBoard();
}

function resetDOM() {
  document.querySelector(".game-container").textContent = "";
  resetPlayersBoards();
  makeBoard(players[0]);
  makeBoard(players[1]);
}

function resetGame() {
  resetDOM();
  resetPlayersBoards();
  hideModal();
  // TODO Add a function to add ships randomly
}

function handleResetButton() {
  const button = document.querySelector(".modal > button");
  button.onclick = () => resetGame();
}

export function checkWinner() {
  if (players[0].board.shipsOnBoard.every((ship) => ship.sunk))
    return players[1].name;
  if (players[1].board.shipsOnBoard.every((ship) => ship.sunk))
    return players[0].name;
  return false;
}

function printWinner() {
  document.querySelector(".winner-name").textContent = `${checkWinner()} win!`;
}

export function handleWinner() {
  printWinner();
  showModal();
  handleResetButton();
}
