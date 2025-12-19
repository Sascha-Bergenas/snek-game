export function createFood(columns, rows, snake) {
  let food;

  do {
    food = {
      x: Math.floor(Math.random() * columns),
      y: Math.floor(Math.random() * rows),
    };
  } while (isOnSnake(food, snake));

  return food;
}

function isOnSnake(food, snake) {
  for (let part of snake.body) {
    if (part.x === food.x && part.y === food.y) {
      return true;
    }
  }
  return false;
}
