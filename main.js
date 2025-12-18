// importera klasser
import { Board } from "./board.js";
import { Snake } from "./snake.js";
// import { createFood, isOnSnake } from "./food.js";
// import { gameTick } from "./gameTick.js";

// ======================
// Konfiguration
// ======================

const snakeColors = [
  "lime",
  "cyan",
  "orange",
  "yellow",
  "magenta",
  "white",
  "mistyrose",
];

let currentColorIndex = 0;

// ======================
// 1. Canvas och rendering
// ======================

const canvas = document.querySelector("#game");
const context = canvas.getContext("2d");

// ======================
// 2. Skapa board
// ======================

const boardColumns = 20;
const boardRows = 20;
const cellSize = 30;

const board = new Board(boardColumns, boardRows, cellSize, context);

// anpassa canvas till boardens storlek
canvas.width = boardColumns * cellSize;
canvas.height = boardRows * cellSize;

// ======================
// 3. Skapa snake
// ======================

const snakeStartPosition = { x: 10, y: 10 };
const snake = new Snake(
  snakeStartPosition,
  snakeColors[currentColorIndex],
  "lime",
  "Snek"
);

// ======================
// 4. Spelloopen
// ======================

function isOnSnake(position) {
  for (let part of snake.snake) {
    if (part.x === position.x && part.y === position.y) {
      return true;
    }
  }
  return false;
}

function createFood() {
  let position;

  do {
    position = {
      x: Math.floor(Math.random() * boardColumns),
      y: Math.floor(Math.random() * boardRows),
    };
  } while (isOnSnake(position));

  return position;
}

let food = createFood();
const tickSpeed = 150; // millisekunder

function gameTick() {
  //  flytta ormen
  snake.moveSnake();

  //  hämta huvudets position
  const head = snake.getSnakeHead();

  // äta
  if (head.x === food.x && head.y === food.y) {
    snake.snakeGrow();
    food = createFood();
  }

  //  kontrollera väggkollision
  if (!board.isInside(head.x, head.y)) {
    handleGameOver();
    return;
  }
  if (snake.collideWithSelf()) {
    handleGameOver();
    return;
  }
  // rita om
  board.drawBackground();
  board.drawGrid();

  board.drawCell(food.x, food.y, "red");

  for (let part of snake.snake) {
    board.drawCell(part.x, part.y, snake.color);
  }
}

function handleGameOver() {
  clearInterval(gameInterval);

  // byt färg
  currentColorIndex = (currentColorIndex + 1) % snakeColors.length;
  snake.color = snakeColors[currentColorIndex];

  // återställ ormen
  snake.reset(snakeStartPosition);

  // rita om direkt
  board.drawBackground();
  board.drawGrid();

  for (let part of snake.snake) {
    board.drawCell(part.x, part.y, snake.color);
  }

  // starta om spelloopen
  gameInterval = setInterval(gameTick, tickSpeed);
}

let gameInterval = setInterval(gameTick, tickSpeed);

// ======================
// 5. Tangentbord → riktning
// ======================

window.addEventListener("keydown", (event) => {
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
