/* eslint-disable no-undef */
import resetDOM from "./reset";

const modal = document.querySelector("dialog");

function resetGame() {
  resetDOM();
  modal.close();
}

function handleResetButton() {
  const button = document.querySelector(".modal > button");
  button.onclick = () => resetGame();
}

function printWinner(name) {
  document.querySelector(".winner-name").textContent = `${name} win!`;
}

export default function handleWinner(name) {
  printWinner(name);
  modal.showModal();
  handleResetButton();
}
