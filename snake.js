export class Snake {
  constructor(snakePart, color, name = "Player") {
    // flyttar kroppen genom att lägga till nytt huvud och ta bort sista segmentet.
    this.snake = [
      {
        x: snakePart.x,
        y: snakePart.y,
      },
      { x: snakePart.x - 1, y: snakePart.y }, // startlängd börjar som 2 segment
    ];

    /*
    { x: 1, y: 0 }   // höger
    { x: -1, y: 0 }  // vänster
    { x: 0, y: 1 }   // ner
    { x: 0, y: -1 }  // upp
     */
    this.currentDirection = { x: 1, y: 0 }; // rör sig åt höger som standard på start
    this.nextDirection = { x: 1, y: 0 }; // kommande inputs

    this.shouldGrow = false;
    this.isAlive = true;

    this.color = color;
    this.name = name;
  }
  setDirection(newDirection) {
    // hindrar 180 graders vändning
    const opposite =
      newDirection.x === -this.currentDirection.x &&
      newDirection.y === -this.currentDirection.y;
    if (!opposite) {
      this.nextDirection = newDirection;
    }
  }
  moveSnake() {
    // applicera input för detta tick
    this.currentDirection = this.nextDirection;

    // hämtar huvudets position
    const head = this.snake[0];

    // beräkna nytt huvud
    const newHead = {
      x: head.x + this.currentDirection.x,
      y: head.y + this.currentDirection.y,
    };
    // Lägg in nytt huvud först
    this.snake.unshift(newHead);

    // om ormen inte ska växa, ta bort sista segmentet
    if (!this.shouldGrow) {
      this.snake.pop();
    } else {
      this.shouldGrow = false;
    }
  }
  // lägger till segment om ormen ska växa
  snakeGrow() {
    this.shouldGrow = true;
  }
  // kontrollera vart huvud är
  getSnakeHead() {
    return this.snake[0];
  }
  //  kontrollera ifall huvudet är i kroppen
  collideWithSelf() {
    const head = this.getSnakeHead();
    for (let i = 1; i < this.snake.length; i++) {
      const snakePart = this.snake[i];
      if (snakePart.x === head.x && snakePart.y === head.y) {
        return true;
      }
    }
    return false;
  }
  reset(newStartPosition) {
    //återställer snakePart-listan
    this.snake = [
      { x: newStartPosition.x, y: newStartPosition.y },
      { x: newStartPosition.x - 1, y: newStartPosition.y },
    ];
    this.currentDirection = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };

    this.shouldGrow = false;
    this.isAlive = true;
  }
}
