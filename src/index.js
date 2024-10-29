/* global document */
import "./style.css";
import Ship from "./modules/ships";
import Player from "./modules/players";
import makeLineWithColumns from "./modules/dom";

// player must be "one" or "two"
// one = player ~ two = computer
function makeBoard(board, player) {
  const container = document.querySelector(`.player-${player}-board`);
  Object.keys(board.cells).forEach((key) => {
    const lineOfCells = makeLineWithColumns(key);
    lineOfCells.forEach((node) => container.append(node));
  });
}

let boatNumber = 0;

function handleCellSplit(cell) {
  const [x, y] = cell.match(/[A-Z]+|[0-9]+/g);
  return [x, y];
}

function addShip(player, shipLength, cell, orientation) {
  // Separate cell arg into it's letter and it's number
  const coordinates = handleCellSplit(cell);
  const newShip = new Ship(shipLength);

  player.board.placeShip(newShip, coordinates, orientation);

  const boatsArray = [];

  Object.keys(player.board.cells).forEach((key) =>
    player.board.cells[key].forEach((cellID, index) => {
      const toPush = [key + (index + 1), boatNumber];
      if (typeof cellID !== "number" && cellID === newShip)
        boatsArray.push(toPush);
    }),
  );

  const boatsCells = boatsArray.map((coordinates) => [
    getPlayerBoardNode(player).querySelector(
      `div[data-cell='${[...coordinates][0]}']`,
    ),
    coordinates[1],
  ]);

  boatsCells.forEach((node, index) => {
    node[0].classList.add(`boat${node[1]}`);
    if (index === 0) node[0].classList.add(`boat-start-${orientation}`);
    if (index === boatsCells.length - 1)
      node[0].classList.add(`boat-end-${orientation}`);
    if (index > 0 && index < boatsCells.length - 1)
      node[0].classList.add(`boat-mid-${orientation}`);
  });
}

function getPlayerBoardNode(player) {
  const whichPlayer = player.name === "Computer" ? "two" : "one";
  return document.querySelector(`.player-${whichPlayer}-board`);
}

const player = new Player("chryszO");
const computer = new Player("Computer");

makeBoard(player.board, "one");
makeBoard(player.board, "two");

// FOR TESTING PURPOSES ONLY!
// PLACE SHIP ON C3 !
// player.board.placeShip(new Ship(3), ["C", 3], "h");

// HIT THE SHIP ON C3!
// player.board.cells["C"][2].hit();
console.log(player.board);
console.log(computer.board);
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
