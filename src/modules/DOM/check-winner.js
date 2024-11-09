import handleWinner from "./game-ends";
import players from "./players";

export default function checkWinner() {
  if (players[0].board.shipsOnBoard.every((ship) => ship.sunk))
    return handleWinner(players[1].name);
  if (players[1].board.shipsOnBoard.every((ship) => ship.sunk))
    return handleWinner(players[0].name);
  return false;
}
