import { makeBoard, renderPlayerShipsOnDOM } from "./dom";
import players from "./make-players";
import GameBoard from "../GAME/board";

function resetPlayersBoards() {
  players[0].board = new GameBoard();
  players[1].board = new GameBoard();
}

function randomizeShipsPlacement() {
  players.forEach((player) => {
    player.board.placeShipsRandomly();
  });
}

export default function resetDOM() {
  // eslint-disable-next-line no-undef
  document.querySelector(".game-container").textContent = "";
  resetPlayersBoards();
  makeBoard(players[0]);
  makeBoard(players[1]);
  randomizeShipsPlacement();
  renderPlayerShipsOnDOM();
}
