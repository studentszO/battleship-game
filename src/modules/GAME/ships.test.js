import Ship from "../ships";

describe("Ship class", () => {
  const ship = new Ship(2);
  it("should return a ship object", () => {
    expect(ship).toMatchObject({
      length: 2,
      hitPoints: 0,
      sunk: false,
    });
  });

  it("should update hitPoints when the ship is hit", () => {
    ship.hit(); // call the function hit()
    ship.hit(); // call the function hit()
    expect(ship.hitPoints).toBe(2);
  });

  it("should sunk the ship when the hitPoints value is equal to the length of the ship", () => {
    // ship length is 2 so:
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBeTruthy();
  });
});
