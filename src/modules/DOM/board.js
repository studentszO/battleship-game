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

export default function makeBoard(player) {
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
