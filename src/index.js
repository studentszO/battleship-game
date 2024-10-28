import "./style.css";
import Board from "./modules/board";
import Player from "./modules/players";
import makeLineWithColumns from "./modules/dom";

const container = document.querySelector(".player-one-board");
for (let i = 0; i < 10; i++) container.appendChild(makeLineWithColumns());
