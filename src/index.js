import "./style.css";
import Player from "./modules/players";
import { makeBoard, eventListener, addShip } from "./modules/dom";

// Create players
const human = new Player("chryszO");
const computer = new Player("Computer");

// Make the boards for each player
makeBoard(human);
makeBoard(computer);

// Start listening to the DOM events
eventListener([human, computer]);

// Add ships for each player
addShip(human, 3, "C2", "v");
addShip(human, 5, "A3", "v");
addShip(human, 2, "J1", "h");
// addShip(player, 2, "E2", "h");
addShip(human, 4, "H6", "h");
addShip(human, 3, "F2", "h");

addShip(computer, 3, "C2", "h");
addShip(computer, 5, "A3", "h");
addShip(computer, 2, "J1", "h");
addShip(computer, 4, "H6", "h");
addShip(computer, 3, "F2", "h");

// FOR TESTING PURPOSES ONLY!

// PLACE SHIP ON C3 !
// player.board.placeShip(new Ship(3), ["C", 3], "h");

// HIT THE SHIP ON C3!
// player.board.cells["C"][2].hit();
