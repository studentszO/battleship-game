import "./style.css";
import Player from "./modules/players";
import { makeBoard, eventListener, addShip } from "./modules/dom";

// Create players
const player = new Player("chryszO");
const computer = new Player("Computer");

// Make the boards for each player
makeBoard(player.board, "one");
makeBoard(player.board, "two");

// Start listening to the DOM events
eventListener([player, computer]);

// Add ships for each player
addShip(player, 3, "C2", "h");
addShip(player, 5, "A3", "h");
addShip(player, 2, "J1", "h");
addShip(player, 4, "H6", "h");
addShip(player, 3, "F2", "h");

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
