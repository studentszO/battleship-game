import "./style.css";
// import Player from "./modules/players";
import players from "./modules/make-players";
import {
  makeBoard,
  eventListener,
  addShip,
  renderPlayerShipsOnDOM,
} from "./modules/dom";

players.forEach((player) => {
  player.board.placeShipsRandomly();
});

// Make the boards for each player
makeBoard(players[0]);
makeBoard(players[1]);
renderPlayerShipsOnDOM();

// Start listening to the DOM events
eventListener([players[0], players[1]]);

// Add ships for each player
// addShip(human, 3, "C2", "v");
// addShip(human, 5, "A3", "v");
// addShip(human, 2, "J1", "h");
// addShip(human, 4, "H6", "h");
// addShip(human, 3, "F2", "h");

// addShip(computer, 3, "C2", "h");
// addShip(computer, 5, "A3", "h");
// addShip(computer, 2, "J1", "h");
// addShip(computer, 4, "H6", "h");
// addShip(computer, 3, "F2", "h");

// addShip(human, 3, "C2", "h");
// addShip(human, 5, "A3", "h");
// addShip(human, 2, "J1", "h");
// addShip(human, 4, "H6", "h");
// addShip(human, 3, "F2", "h");
