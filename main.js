// importera klasser
import { Board } from "./board.js";
import { Snake } from "./snake.js";
import { createFood } from "./food.js";

// Konfiguration

const snakeColors = [
  "lime",
  "cyan",
  "mistyrose",
  "orange",
  "yellow",
  "magenta",
  "white",
];

let currentColorIndex = 0;

let isGameRunning = true;

// Canvas och rendering

const canvas = document.querySelector("#game");
const context = canvas.getContext("2d");

const gameOverOverlay = document.getElementById("game-over-overlay");

//  Skapa board

const boardColumns = 20;
const boardRows = 20;
const cellSize = 35;

const board = new Board(boardColumns, boardRows, cellSize, context);

// anpassa canvas till boardens storlek
canvas.width = boardColumns * cellSize;
canvas.height = boardRows * cellSize;

// Skapa snake

const snakeStartPosition = { x: 10, y: 10 };
const snake = new Snake(
  snakeStartPosition,
  snakeColors[currentColorIndex],
  "Snek"
);

// 4. Spelloopen

let food = createFood(boardColumns, boardRows, snake);

const tickSpeed = 150; // millisekunder

function gameTick() {
  if (!isGameRunning) {
    return;
  }
  snake.moveSnake();
  //  flytta ormen

  //  hämta huvudets position
  const head = snake.getSnakeHead();

  // äter mat
  if (head.x === food.x && head.y === food.y) {
    snake.snakeGrow();
    food = createFood(boardColumns, boardRows, snake);
  }

  //  kontrollera väggkollision
  if (!board.isInside(head.x, head.y)) {
    handleGameOver();
    return;
  }
  // kontrollera kollision med själv
  if (snake.collideWithSelf()) {
    handleGameOver();
    return;
  }
  // rita om
  board.drawBackground();
  board.drawGrid();

  // rita mat
  board.drawCell(food.x, food.y, "red");

  for (let part of snake.snake) {
    board.drawCell(part.x, part.y, snake.color);
  }
}

function handleGameOver() {
  console.log("handleGameOver körs");
  clearInterval(gameInterval);
  isGameRunning = false;

  // byt färg
  currentColorIndex = (currentColorIndex + 1) % snakeColors.length;
  snake.color = snakeColors[currentColorIndex];

  // visa overlay
  gameOverOverlay.classList.add("visible");
}

function restartGame() {
  console.log("restartGame körs");

  // göm overlay
  gameOverOverlay.classList.remove("visible");

  // reset speldata
  snake.reset(snakeStartPosition);
  food = createFood();

  isGameRunning = true;

  // rita startläge
  board.drawBackground();
  board.drawGrid();
  board.drawCell(food.x, food.y, "red");

  for (let part of snake.snake) {
    board.drawCell(part.x, part.y, snake.color);
  }

  // starta loopen igen
  gameInterval = setInterval(gameTick, tickSpeed);
}

let gameInterval = setInterval(gameTick, tickSpeed);

//  Tangentbord → riktning

window.addEventListener("keydown", (event) => {
  if (!isGameRunning && event.code === "Space") {
    restartGame();
    return;
  }

  if (!isGameRunning) {
    return;
  }

  switch (event.key) {
    case "ArrowUp":
      snake.setDirection({ x: 0, y: -1 });
      break;
    case "ArrowDown":
      snake.setDirection({ x: 0, y: 1 });
      break;
    case "ArrowLeft":
      snake.setDirection({ x: -1, y: 0 });
      break;
    case "ArrowRight":
      snake.setDirection({ x: 1, y: 0 });
      break;
  }
});
