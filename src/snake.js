export class Snake {
  constructor(snakePart, color, name = "snek") {
    // flyttar kroppen genom att lägga till nytt huvud och ta bort sista segmentet.
    this.body = [
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
    const head = this.body[0];

    // beräkna nytt huvud
    const newHead = {
      x: head.x + this.currentDirection.x,
      y: head.y + this.currentDirection.y,
    };
    // Lägg in nytt huvud först
    this.body.unshift(newHead);

    // om ormen inte ska växa, ta bort sista segmentet
    if (!this.shouldGrow) {
      this.body.pop();
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
    return this.body[0];
  }
  //  kontrollera ifall huvudet är i kroppen
  collideWithSelf() {
    const head = this.getSnakeHead();
    for (let i = 1; i < this.body.length; i++) {
      const snakePart = this.body[i];
      if (snakePart.x === head.x && snakePart.y === head.y) {
        return true;
      }
    }
    return false;
  }
  reset(newStartPosition) {
    //återställer snakePart-listan
    this.body = [
      { x: newStartPosition.x, y: newStartPosition.y },
      { x: newStartPosition.x - 1, y: newStartPosition.y },
    ];
    this.currentDirection = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };

    this.shouldGrow = false;
    this.isAlive = true;
  }
}
