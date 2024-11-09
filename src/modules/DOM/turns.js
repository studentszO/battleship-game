/* global document */
import checkWinner from "./check-winner";
import players from "./players";
import { randomizeFactory } from "../GAME/board";
import { getPlayerBoardNode } from "./ships";
import handleCellSplit from "./cell-args-handler";

function updateMissCells(player) {
  player.board.missedAttacks.forEach((coords) => {
    const node = getPlayerBoardNode(player).querySelector(
      `[data-cell=${coords.join("")}]`,
    );
    node.classList.add("clicked", "miss");
  });
}

function attackCell(player, cell) {
  const coordinates = handleCellSplit(cell.getAttribute("data-cell"));
  const isHit = player.board.receiveAttack(coordinates[0], coordinates[1]);
  if (!isHit) return updateMissCells(player);
  return cell.classList.add("hit");
}

function IATurn(ia) {
  const IAcoords = randomizeFactory().cell();

  const IAtarget = document.querySelector(
    `.game-container > div:first-of-type div[data-cell=${IAcoords.join("")}]`,
  );

  if (IAtarget.classList.contains("clicked")) return IATurn(ia);

  attackCell(ia, IAtarget);
}

const play = (event) => {
  if (event.target.classList.contains("clicked")) return;
  if (!event.target.hasAttribute("data-cell")) return;

  event.target.classList.add("clicked");

  attackCell(players[1], event.target);
  if (!checkWinner()) IATurn(players[0]);
};

export default play;
