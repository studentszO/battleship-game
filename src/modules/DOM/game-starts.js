/* eslint-disable no-undef */
import resetDOM from "./reset";
import play from "./turns";

const modal = document.querySelector(".start-modal");

function eventListener() {
  const gameContainer = document.querySelector(
    ".game-container > div:last-of-type",
  );

  gameContainer.addEventListener("click", play);
}

export default function showStartModal() {
  modal.showModal();
}

function startGame() {
  const startButton = document.querySelector("button.start");
  startButton.onclick = () => {
    eventListener();
    modal.close();
  };
}

function randomizeShipsButtonHandler() {
  const randomizeButton = document.querySelector("button.randomize");
  randomizeButton.onclick = resetDOM;
}

startGame();
randomizeShipsButtonHandler();
resetDOM();
