/* eslint-disable no-undef */
const makeLineWithColumns = () => {
  const lineDiv = document.createElement("div");

  const makeColumnCell = (className) => {
    const div = document.createElement("div");
    div.classList.add(className);
    return div;
  };

  for (let i = 0; i < 10; i++)
    lineDiv.appendChild(makeColumnCell(`column${i}`));

  return lineDiv;
};

export default makeLineWithColumns;
