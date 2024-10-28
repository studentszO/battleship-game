/* eslint-disable no-undef */
const makeLineWithColumns = (cell) => {
  // const lineDiv = document.createElement("div");
  const lineDiv = [];

  const makeColumnCell = (className, id) => {
    const div = document.createElement("div");
    div.classList.add(className);
    div.setAttribute("data-cell", id);
    return div;
  };

  for (let i = 0; i < 10; i++)
    lineDiv.push(makeColumnCell(`column${i}`, `${cell}${i + 1}`));

  return lineDiv;
};

export default makeLineWithColumns;
