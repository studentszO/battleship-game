import "./style.css";
// import Player from "./modules/players";
import players from "./modules/DOM/make-players";
import {
  makeBoard,
  eventListener,
  renderPlayerShipsOnDOM,
} from "./modules/DOM/dom";

players.forEach((player) => {
  player.board.placeShipsRandomly();
});

// Make the boards for each player
makeBoard(players[0]);
makeBoard(players[1]);
renderPlayerShipsOnDOM();

// Start listening to the DOM events
eventListener([players[0], players[1]]);
