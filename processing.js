const programCode = (processingInstance) => {
  with (processingInstance) {
    size(400, 395);
    frameRate(30);
    // Code starts here
    let playerTurn = 0;
    let NUM_COLS = 3;
    let NUM_ROWS = 3;
    let SYMBOLS = ["X", "O"];

    let tiles = [];

    class Tile {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = width / NUM_COLS;
        this.label = "";
      }

      draw() {
        fill(214, 247, 202);
        strokeWeight(2);
        rect(this.x, this.y, this.size, this.size, 10);
        textSize(100);
        textAlign(CENTER, CENTER);
        fill(0, 0, 0);
        text(this.label, this.x + this.size / 2, this.y + this.size / 2);
      }

      empty() {
        return this.label === "";
      }

      onClick() {
        // If the tile is not empty, exit the function
        if (!this.empty()) {
          return;
        }
        // Put the player's symbol on the tile
        this.label = SYMBOLS[playerTurn];
        // Change the turn
        playerTurn++;
        if (playerTurn >= SYMBOLS.length) {
          playerTurn = 0;
        }
      }

      handleMouseClick(x, y) {
        // Check for mouse clicks inside the tile
        if (
          x >= this.x &&
          x <= this.x + this.size &&
          y >= this.y &&
          y <= this.y + this.size
        ) {
          this.onClick();
        }
      }
    }
    for (let i = 0; i < NUM_COLS; i++) {
      for (let j = 0; j < NUM_ROWS; j++) {
        tiles.push(
          new Tile(i * (width / NUM_COLS - 1), j * (height / NUM_ROWS - 1)),
        );
      }
    }

    const drawTiles = () => {
      for (let i in tiles) {
        tiles[i].draw();
      }
    };

    mouseReleased = () => {
      for (let i in tiles) {
        tiles[i].handleMouseClick(mouseX, mouseY);
      }
    };

    draw = () => {
      background(143, 143, 143);
      drawTiles();
    };

    // Code ends here
  }
};

const canvas = document.getElementById("mycanvas");

const processingInstance = new Processing(canvas, programCode);
