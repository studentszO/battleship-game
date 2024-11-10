/* global document */
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

export default function makeBoard(player) {
  const gameContainer = document.querySelector(".game-container");
  const boardContainer = makeDOMElement("div");

  boardContainer.classList.add(`${player.name}-board`);

  gameContainer.appendChild(boardContainer);

  Object.keys(player.board.cells).forEach((key) => {
    const lineOfCells = makeCellsLine(key);
    lineOfCells.forEach((node) => boardContainer.appendChild(node));
  });
}
