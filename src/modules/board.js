/* eslint-disable no-return-assign */
import Ship from "./ships";

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

export default class Board {
  constructor() {
    this.board = makeBoard();
  }

  placeShip(ship, [coordinatesX, coordinatesY], position) {
    const verticalArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const key = Object.keys(this.board).indexOf(coordinatesX);

    if (position !== "v" && position !== "h")
      throw new Error("Wrong position parameter: use only v or h");

    if (
      (position === "h" && coordinatesY - 1 + ship.length > 10) ||
      (position === "h" && key + ship.length > 10)
    )
      throw new Error("Can't place this ship here");

    if (coordinatesY - 1 + ship.length > 10 || position === "v") {
      for (let i = 0; i < ship.length; i++)
        this.board[verticalArray[key + i]][coordinatesY] = ship;
    } else {
      for (let i = 0; i < ship.length; i++)
        this.board[coordinatesX][coordinatesY - 1 + i] = ship;
    }
  }
}
