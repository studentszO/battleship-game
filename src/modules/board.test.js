import Board from "./board";
import Ship from "./ships";

describe("Place ships tests", () => {
  const board = new Board();
  it("should throw an error if no position is given", () => {
    const ship = new Ship(2);
    expect(() => board.placeShip(ship, ["A", 9])).toThrow();
  });

  it("should place a ship on the board horizontally", () => {
    const ship = new Ship(2);
    board.placeShip(ship, ["A", 9], "h");
    expect(board.board.A[8]).toMatchObject(ship);
    expect(board.board.A[9]).toMatchObject(ship);
  });

  it("should NOT place a ship on the board horizontally if the length of the boat is greater than the board", () => {
    const ship = new Ship(2);
    board.placeShip(ship, ["B", 9], "h");
    expect(board.board.B[10]).toBeUndefined();
  });

  it("should NOT place a ship on the board if the length of the boat is greater than the board horizontally AND vertically", () => {
    const ship = new Ship(2);
    expect(() => board.placeShip(ship, ["J", 10], "h")).toThrow();
  });

  it("should place a ship on the board vertically", () => {
    const ship = new Ship(5);
    board.placeShip(ship, ["C", 7], "v");
    expect(board.board.G[7]).toMatchObject(ship);
  });
});

describe("receiveAttack method tests", () => {
  const board = new Board();
  board.placeShip(new Ship(2), ["A", 2], "h");

  it("should add an hit point to the ship if the ship is present on those coordinates", () => {
    expect(board.receiveAttack("A", 2)).toMatch(/HIT!/);
  });

  it("should say when there is no ship on the coordinates", () => {
    expect(board.receiveAttack("A", 5)).toMatch(/No ship/);
  });

  it("should records the missed attack", () => {
    expect(board.missedAttacks[0]).toEqual(["A", 5]);
  });
});
