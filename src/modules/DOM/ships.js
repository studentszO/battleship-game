/* global document */
import players from "./players";
import Ship from "../GAME/ships";
import handleCellSplit from "./cell-args-handler";

export function getPlayerBoardNode(player) {
  return document.querySelector(`.${player.name}-board`);
}

function getShipCells(player, ship) {
  const cells = [];

  Object.keys(player.board.cells).forEach((key) =>
    player.board.cells[key].forEach((cellID, index) => {
      if (typeof cellID !== "number" && cellID === ship)
        cells.push(key + (index + 1));
    }),
  );

  return cells;
}

function getShipOrientation(arr) {
  return arr.map((ship) =>
    ship[0][0].nextElementSibling === ship[1][0] ? "h" : "v",
  );
}

function getShipNodes(player, array) {
  const nodesArray = array.map((cellID) => [
    getPlayerBoardNode(player).querySelector(`div[data-cell='${cellID}']`),
  ]);

  return nodesArray;
}

function handleNodesClasses(nodesArray, shipOrientation) {
  // if statement to not show enemy ships on DOM
  if (
    nodesArray[0][0].parentNode !==
    document.querySelector(".game-container > div:first-of-type")
  )
    return;
  nodesArray.forEach((node, index) => {
    if (index === 0) node[0].classList.add(`ship-start-${shipOrientation}`);
    if (index === nodesArray.length - 1)
      node[0].classList.add(`ship-end-${shipOrientation}`);
    if (index > 0 && index < nodesArray.length - 1)
      node[0].classList.add(`ship-mid-${shipOrientation}`);
  });
}

export function renderPlayerShipsOnDOM() {
  const allShipsCells = [];

  for (let i = 0; i < players[0].board.shipsOnBoard.length; i++)
    allShipsCells.push(
      getShipNodes(
        players[0],
        getShipCells(players[0], players[0].board.shipsOnBoard[i]),
      ),
    );

  const shipsOrientation = getShipOrientation(allShipsCells);
  allShipsCells.forEach((shipCells, index) => {
    handleNodesClasses(shipCells, shipsOrientation[index]);
  });
}

export function addShip(player, shipLength, cell, orientation) {
  const coordinates = handleCellSplit(cell);
  const newShip = new Ship(shipLength);

  player.board.placeShip(newShip, coordinates, orientation);

  const shipCells = getShipCells(player, newShip);
  const shipNodes = getShipNodes(player, shipCells);

  handleNodesClasses(shipNodes, orientation);
}
