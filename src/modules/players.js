import Board from "./board";

export default class Player {
  constructor(name) {
    this.name = name;
    this.board = new Board();
  }
}
