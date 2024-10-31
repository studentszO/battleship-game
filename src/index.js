import "./style.css";
import players from "./modules/DOM/make-players";
import {
  makeBoard,
  eventListener,
  renderPlayerShipsOnDOM,
} from "./modules/DOM/dom";

export default function placeShipsRandomlyForAll() {
  players.forEach((player) => {
    player.board.placeShipsRandomly();
  });
}

// Make the boards for each player
makeBoard(players[0]);
makeBoard(players[1]);
placeShipsRandomlyForAll();
renderPlayerShipsOnDOM();

// Start listening to the DOM events
eventListener([players[0], players[1]]);
