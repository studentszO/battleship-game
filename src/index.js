/* global document */
import "./style.css";
import Board from "./modules/board";
import Player from "./modules/players";
import makeLineWithColumns from "./modules/dom";

// player must be "one" or "two"
// one = player ~ two = computer
function makeBoard(board, player) {
  const container = document.querySelector(`.player-${player}-board`);
  Object.keys(board.cells).forEach((key) => {
    container.appendChild(makeLineWithColumns(key));
  });
}

const player = new Player("chryszO");
const computer = new Player("Computer");

makeBoard(player.board, "one");
