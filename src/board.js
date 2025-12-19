export class Board {
  constructor(columns, rows, cellSize, context) {
    this.columns = columns;
    this.rows = rows;
    this.cellSize = cellSize;
    this.context = context;
  }

  drawBackground() {
    this.context.fillStyle = "#111";
    this.context.fillRect(
      0,
      0,
      this.columns * this.cellSize,
      this.rows * this.cellSize
    );
  }

  drawGrid() {
    this.context.strokeStyle = "rgba(255, 255, 255, 0.2)";

    // lodräta linjer
    for (let column = 0; column <= this.columns; column++) {
      const x = column * this.cellSize;
      this.context.beginPath();
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.rows * this.cellSize);
      this.context.stroke();
    }

    // vågräta linjer
    for (let row = 0; row <= this.rows; row++) {
      const y = row * this.cellSize;
      this.context.beginPath();
      this.context.moveTo(0, y);
      this.context.lineTo(this.columns * this.cellSize, y);
      this.context.stroke();
    }
  }
  drawCell(column, row, color) {
    this.context.fillStyle = color;
    this.context.fillRect(
      column * this.cellSize,
      row * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }

  isInside(column, row) {
    return column >= 0 && column < this.columns && row >= 0 && row < this.rows;
  }
}
