/* eslint-disable no-return-assign */

const makeBoard = () => {
  const boardObject = {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
    I: [],
    J: [],
  };
  Object.keys(boardObject).forEach(
    (key) => (boardObject[key] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  );
  return boardObject;
};

const getCharCode = (char) => char.charCodeAt(0);

function getShipPlacementCells(
  [coordinatesX, coordinatesY],
  shipLength,
  orientation,
) {
  const cellsArray = [];
  const charCodeX = getCharCode(coordinatesX);

  if (coordinatesY - 1 + shipLength > 10 || orientation === "v") {
    for (let i = 0; i < shipLength; i++)
      cellsArray.push([String.fromCharCode(charCodeX + i), coordinatesY - 1]);
  } else {
    for (let i = 0; i < shipLength; i++)
      cellsArray.push([coordinatesX, coordinatesY - 1 + i]);
  }

  return cellsArray;
}

export default class GameBoard {
  constructor() {
    this.cells = makeBoard();
    this.shipsOnBoard = [];
    this.missedAttacks = [];
  }

  allSunk() {
    return this.shipsOnBoard.every((ship) => ship.sunk === true);
  }

  isEmptyCells(array) {
    return array.every(
      (cell) => typeof this.cells[cell[0]][cell[1]] === "number",
    );
  }

  validateShip(array, ship) {
    array.forEach((cell) => (this.cells[cell[0]][cell[1]] = ship));
  }

  placeShip(ship, [coordinatesX, coordinatesY], position) {
    // coordinatesX = vertical / columns (i.g: A or C...)
    // coordinatesY = horizontal / inline (i.g: 2 or 7...)
    const key = Object.keys(this.cells).indexOf(coordinatesX);
    const shipCells = getShipPlacementCells(
      [coordinatesX, coordinatesY],
      ship.length,
      position,
    );

    this.shipsOnBoard.push(ship);

    if (position !== "v" && position !== "h")
      throw new Error("Wrong position parameter: use only v or h");

    if (
      (position === "h" && coordinatesY - 1 + ship.length > 10) ||
      (position === "v" && key + ship.length > 10) ||
      !this.isEmptyCells(shipCells)
    )
      throw new Error("Can't place this ship here");

    this.validateShip(shipCells, ship);
  }

  receiveAttack(coordinatesX, coordinatesY) {
    const target = this.cells[coordinatesX][coordinatesY - 1];
    if (typeof target !== "number") {
      target.hit();
      return true;
    }
    this.missedAttacks.push([coordinatesX, coordinatesY]);
    return false;
  }
}
