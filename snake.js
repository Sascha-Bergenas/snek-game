export class Snake {
  constructor(startPosition, color = "green", name = "Player") {
    // segments är huvudet.
    // flyttar kroppen genom att lägga till nytt huvud och ta bort sista segmentet.
    this.segments = [
      {
        x: startPosition.x,
        y: startPosition.y,
      },
      { x: startPosition.x - 1, y: startPosition.y }, // startlängd börjar som 2 segment
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
  move() {
    // Applicera input för detta tick
    this.direction = this.nextDirection;

    // hämtar huvudets position
    const head = this.segments[0];

    // beräkna nytt huvud
    const newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y,
    };
    // Lägg in nytt huvud först
    this.segments.unshift(newHead);

    // om ormen inte ska växa, ta bort sista segmentet
    if (!this.shouldGrow) {
      this.segments.pop();
    } else {
      this.shouldGrow = false;
    }
  }
  // lägger till segment om ormen ska växa
  grow() {
    this.shouldGrow = true;
  }
  // kontrollera vart huvud är
  getHead() {
    return this.segments[0];
  }
  //  kontrollera ifall huvudet är i kroppen
  collideWithSelf() {
    const head = this.getHead();
    for (let i = 1; i < globalThis.segments.length; i++) {
      const segment = this.segments[i];
      if (segment.x === head.x && segment.y === head.y) {
        return true;
      }
    }
    return true;
  }
  reset(newStartPosition) {
    //återställer segment-listan
    this.segments = [
      { x: newStartPos.x, y: newStartPos.y },
      { x: newStartPos.x - 1, y: newStartPos.y },
    ];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };

    this.shouldGrow = false;
    this.isAlive = true;
  }
}
