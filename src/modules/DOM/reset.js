/* global document */
import makeBoard from "./board";
import players from "./make-players";
import GameBoard from "../GAME/board";
import { renderPlayerShipsOnDOM } from "./ships";

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
  document.querySelector(".game-container").textContent = "";
  resetPlayersBoards();
  makeBoard(players[0]);
  makeBoard(players[1]);
  randomizeShipsPlacement();
  renderPlayerShipsOnDOM();
}
