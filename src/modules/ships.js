export default class Ship {
  constructor(length) {
    this.hitPoints = 0;
    this.length = length;
    this.sunk = false;
  }

  hit() {
    this.hitPoints += 1;
    this.isSunk();
  }

  isSunk() {
    if (this.hitPoints === this.length) this.sunk = true;
  }
}
