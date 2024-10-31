/* eslint-disable no-undef */
/* global document */
import GameBoard from "./board";
import Ship from "./ships";
import players from "..";

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

function makeDOMElement(element) {
  return document.createElement(element);
}

function handleBoardLetters() {
  const div = makeDOMElement("div");
  div.classList.add("board-numbers");

  for (let i = 0; i < 10; i++) {
    const span = makeDOMElement("span");
    span.textContent = i + 1;
    div.appendChild(span);
  }

  return div;
}

function handleBoardNumbers() {
  const div = makeDOMElement("div");
  div.classList.add("board-letters");

  for (let i = 0; i < 10; i++) {
    const span = makeDOMElement("span");
    span.textContent = String.fromCharCode(65 + i);
    div.appendChild(span);
  }

  return div;
}

export function makeBoard(player) {
  const gameContainer = document.querySelector(".game-container");
  const boardContainer = makeDOMElement("div");

  boardContainer.classList.add(`${player.name}-board`);

  gameContainer.appendChild(boardContainer);
  boardContainer.appendChild(handleBoardLetters());
  boardContainer.appendChild(handleBoardNumbers());

  Object.keys(player.board.cells).forEach((key) => {
    const lineOfCells = makeCellsLine(key);
    lineOfCells.forEach((node) => boardContainer.appendChild(node));
  });
}

export function getPlayerBoardNode(player) {
  return document.querySelector(`.${player.name}-board`);
}

// Separate cell arg into it's letter and it's number
function handleCellSplit(cell) {
  const [x, y] = cell.match(/[A-Z]+|[0-9]+/g);
  return [x, y];
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

export function addShip(player, shipLength, cell, orientation) {
  const coordinates = handleCellSplit(cell);
  const newShip = new Ship(shipLength);

  player.board.placeShip(newShip, coordinates, orientation);

  const shipCells = getShipCells(player, newShip);
  const shipNodes = getShipNodes(player, shipCells);

  handleNodesClasses(shipNodes, orientation);
}

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

function randomizeCellForIA() {
  const verticalArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const [x, y] = [
    verticalArray[Math.floor(Math.random() * 10)],
    Math.round(Math.random() * 9) + 1,
  ];

  return [x, y];
}

function IATurn(ia) {
  const IAcoords = randomizeCellForIA();

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
  if (checkWinner()) handleWinner();
};

export function eventListener() {
  const gameContainer = document.querySelector(
    ".game-container > div:last-of-type",
  );

  gameContainer.addEventListener("click", play);
}

function showModal() {
  const modal = document.querySelector("dialog");
  modal.showModal();
}

function hideModal() {
  const modal = document.querySelector("dialog");
  modal.close();
}

// RESET BOARDS FUNCTIONS
function resetPlayersBoards() {
  players[0].board = new GameBoard();
  players[1].board = new GameBoard();
}

function resetDOM() {
  document.querySelector(".game-container").textContent = "";
  resetPlayersBoards();
  makeBoard(players[0]);
  makeBoard(players[1]);
}

function resetGame() {
  resetDOM();
  resetPlayersBoards();
  hideModal();
  // TODO Add a function to add ships randomly
}

function handleResetButton() {
  const button = document.querySelector(".modal > button");
  button.onclick = () => resetGame(); // TODO
}

const checkWinner = () => {
  if (players[0].board.shipsOnBoard.every((ship) => ship.sunk))
    return players[1].name;
  if (players[1].board.shipsOnBoard.every((ship) => ship.sunk))
    return players[0].name;
  return false;
};

function printWinner() {
  document.querySelector(".winner-name").textContent = `${checkWinner()} win!`;
}

function handleWinner() {
  printWinner();
  showModal();
  handleResetButton();
}
