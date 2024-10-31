import GameBoard, { randomizeFactory } from "./board";
import Ship from "./ships";

describe("Place ships tests", () => {
  const board = new GameBoard();
  it("should throw an error if no position is given", () => {
    const ship = new Ship(2);
    expect(() => board.placeShip(ship, ["A", 9])).toThrow();
  });

  it("should place a ship on the board horizontally", () => {
    const ship = new Ship(2);
    board.placeShip(ship, ["A", 9], "h");
    expect(board.cells.A[8]).toMatchObject(ship);
    expect(board.cells.A[9]).toMatchObject(ship);
  });

  it("should NOT place a ship on the board horizontally if the length of the boat is greater than the board", () => {
    const ship = new Ship(2);
    board.placeShip(ship, ["B", 9], "h");
    expect(board.cells.B[10]).toBeUndefined();
  });

  it("should NOT place a ship on the board if the length of the boat is greater than the board vertically", () => {
    const ship = new Ship(2);
    expect(board.placeShip(ship, ["J", 1], "v")).toBeUndefined();
  });

  it("should NOT place a ship on the board if the length of the boat is greater than the board horizontally AND vertically", () => {
    const ship = new Ship(2);
    expect(board.placeShip(ship, ["J", 10], "h")).toBeUndefined();
  });

  it("should place a ship on the board vertically", () => {
    const ship = new Ship(5);
    board.placeShip(ship, ["C", 7], "v");
    expect(board.cells.G[6]).toMatchObject(ship);
  });

  it("should not place a ship if one is already there", () => {
    const shipFive = new Ship(5);
    const shipTwo = new Ship(2);
    board.placeShip(shipFive, ["A", 3], "v");
    expect(board.placeShip(shipTwo, ["E", 2], "h")).toBeUndefined();
  });
});

describe("receiveAttack method tests", () => {
  const board = new GameBoard();
  board.placeShip(new Ship(2), ["A", 2], "h");
  board.placeShip(new Ship(2), ["A", 7], "v");

  it("should add an hit point to the ship if the ship is present on those coordinates", () => {
    expect(board.receiveAttack("A", 2)).toBeTruthy();
  });

  it("should say when there is no ship on the coordinates", () => {
    expect(board.receiveAttack("A", 5)).toBeFalsy();
  });

  it("should records the missed attack", () => {
    expect(board.missedAttacks[0]).toEqual(["A", 5]);
  });

  it("should be able to tell if all the ships are sunk", () => {
    board.receiveAttack("A", 2);
    board.receiveAttack("A", 7);
    board.receiveAttack("B", 7);
    expect(board.allSunk()).toBe(true);
  });
});
