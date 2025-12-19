export function setupInput(snake, onRestart) {
  window.addEventListener("keydown", (event) => {
    // restart (SPACE)
    if (event.code === "Space") {
      onRestart();
      return;
    }

    // rörelse
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
}
