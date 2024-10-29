/* eslint-disable no-undef */
/* global document */

import Ship from "./ships";

let boatNumber = 0;

function makeCellsLine(cell) {
  const lineDiv = [];

  const makeCell = (cellID) => {
    const div = document.createElement("div");
    div.setAttribute("data-cell", cellID);
    return div;
  };

  for (let i = 0; i < 10; i++) lineDiv.push(makeCell(`${cell}${i + 1}`));

  return lineDiv;
}

// player must be "one" or "two"
// one = player ~ two = computer
export function makeBoard(board, player) {
  const container = document.querySelector(`.player-${player}-board`);
  Object.keys(board.cells).forEach((key) => {
    const lineOfCells = makeCellsLine(key);
    lineOfCells.forEach((node) => container.append(node));
  });
}

export function getPlayerBoardNode(player) {
  const whichPlayer = player.name === "Computer" ? "two" : "one";
  return document.querySelector(`.player-${whichPlayer}-board`);
}

function handleCellSplit(cell) {
  const [x, y] = cell.match(/[A-Z]+|[0-9]+/g);
  return [x, y];
}

export function addShip(player, shipLength, cell, orientation) {
  // Separate cell arg into it's letter and it's number
  const coordinates = handleCellSplit(cell);
  const newShip = new Ship(shipLength);

  player.board.placeShip(newShip, coordinates, orientation);

  const boatsArray = [];

  Object.keys(player.board.cells).forEach((key) =>
    player.board.cells[key].forEach((cellID, index) => {
      const toPush = [key + (index + 1), boatNumber];
      if (typeof cellID !== "number" && cellID === newShip)
        boatsArray.push(toPush);
    }),
  );

  const boatsCells = boatsArray.map((coordinates) => [
    getPlayerBoardNode(player).querySelector(
      `div[data-cell='${[...coordinates][0]}']`,
    ),
    coordinates[1],
  ]);

  boatsCells.forEach((node, index) => {
    node[0].classList.add(`boat${node[1]}`);
    if (index === 0) node[0].classList.add(`boat-start-${orientation}`);
    if (index === boatsCells.length - 1)
      node[0].classList.add(`boat-end-${orientation}`);
    if (index > 0 && index < boatsCells.length - 1)
      node[0].classList.add(`boat-mid-${orientation}`);
  });
}

function updateBoardWhenAttacking(boardNode, cell) {
  const node = boardNode.querySelector(`[data-cell=${cell}]`);
  const hitOrMiss = node.className.match(/boat/) ? "hit" : "miss";
  node.classList.add(hitOrMiss);
}

function attackCell(player, cell) {
  const coordinates = handleCellSplit(cell);
  const gameBoardCell = player.board.cells[coordinates[0]][coordinates[1] - 1];
  if (typeof gameBoardCell !== "number") {
    gameBoardCell.hit();
  }
  updateBoardWhenAttacking(getPlayerBoardNode(player), cell);
}

export function eventListener(players) {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("clicked")) return;

    const cell = event.target.getAttribute("data-cell");
    event.target.classList.add("clicked");
    const parentNode = event.target.parentElement.className;
    const playerToAttack = parentNode.match(/two/) ? players[1] : players[0];

    if (cell) attackCell(playerToAttack, cell);
  });
}
