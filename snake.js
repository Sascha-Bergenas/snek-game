export class Snake {
  constructor(snakePart, color = "green", name = "Player") {
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
    this.direction = { x: 1, y: 0 }; // rör sig åt höger som standard på start
    this.nextDirection = { x: 1, y: 0 }; // kommande inputs

    this.shouldGrow = false;
    this.isAlive = true;

    this.color = color;
    this.name = name;
  }
  setDirection(newDirection) {
    // hindrar 180 graders vändning
    const opposite =
      newDirection.x === -this.direction.x &&
      newDirection.y === -this.direction.y;
    if (!opposite) {
      this.nextDirection = newDirection;
    }
  }
  moveSnake() {
    // applicera input för detta tick
    this.direction = this.nextDirection;

    // hämtar huvudets position
    const head = this.snake[0];

    // beräkna nytt huvud
    const newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y,
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
    const head = this.getHead();
    for (let i = 1; i < globalThis.snake.length; i++) {
      const segment = this.snake[i];
      if (segment.x === head.x && segment.y === head.y) {
        return true;
      }
    }
    return true;
  }
  reset(newStartPosition) {
    //återställer segment-listan
    this.snake = [
      { x: newStartPos.x, y: newStartPos.y },
      { x: newStartPos.x - 1, y: newStartPos.y },
    ];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };

    this.shouldGrow = false;
    this.isAlive = true;
  }
}
