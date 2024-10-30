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

export default class GameBoard {
  constructor() {
    this.cells = makeBoard();
    this.shipsOnBoard = [];
    this.missedAttacks = [];
  }

  allSunk() {
    return this.shipsOnBoard.every((ship) => ship.sunk === true);
  }

  getShipPlacementCells([coordinatesX, coordinatesY], shipLength, orientation) {
    const cellsArray = [];

    if (coordinatesY - 1 + shipLength > 10 || orientation === "v") {
      for (let i = 0; i < shipLength; i++)
        cellsArray.push(this.cells[coordinatesX][coordinatesY - 1]);
    } else {
      for (let i = 0; i < shipLength; i++)
        cellsArray.push(this.cells[coordinatesX][coordinatesY - 1 + i]);
    }

    return cellsArray;
  }

  placeShip(ship, [coordinatesX, coordinatesY], position) {
    // coordinatesX = vertical / columns (i.g: A or C...)
    // coordinatesY = horizontal / inline (i.g: 2 or 7...)
    this.shipsOnBoard.push(ship);
    const verticalArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const key = Object.keys(this.cells).indexOf(coordinatesX);

    if (position !== "v" && position !== "h")
      throw new Error("Wrong position parameter: use only v or h");

    if (
      (position === "h" && coordinatesY - 1 + ship.length > 10) ||
      (position === "v" && key + ship.length > 10) ||
      !this.getShipPlacementCells(
        [verticalArray[key], coordinatesY],
        ship.length,
        position,
      ).every((cell) => typeof cell === "number")
    )
      throw new Error("Can't place this ship here");

    if (coordinatesY - 1 + ship.length > 10 || position === "v") {
      for (let i = 0; i < ship.length; i++)
        this.cells[verticalArray[key + i]][coordinatesY - 1] = ship;
    } else {
      for (let i = 0; i < ship.length; i++)
        this.cells[coordinatesX][coordinatesY - 1 + i] = ship;
    }
  }

  receiveAttack(coordinatesX, coordinatesY) {
    const target = this.cells[coordinatesX][coordinatesY - 1];
    if (typeof target !== "number") {
      target.hit();
      return "Target HIT!";
    }
    this.missedAttacks.push([coordinatesX, coordinatesY]);
    return "No ship on those coordinates! :(";
  }
}
