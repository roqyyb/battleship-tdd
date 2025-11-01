import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.grid = (() => {
      let arr = [];

      for (let i = 0; i < 10; i++) {
        const row = [];

        for (let j = 0; j < 10; j++) {
          row.push(null);
        }

        arr.push(row);
      }

      return arr;
    })();
  }

  placeShip(length, [x, y], orientation) {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      throw new Error("Invalid coordinate!");
    }

    if (
      (orientation === "v" && length + x > 10) ||
      (orientation === "h" && length + y > 10)
    ) {
      throw new Error("Invalid placement!");
    }

    const isValidPlacement = (() => {
      let targetPlacement = [];

      if (orientation === "v") {
        for (let i = 0; i < length; i++) {
          targetPlacement.push(this.grid[x + i][y]);
        }
      }
      if (orientation === "h") {
        for (let i = 0; i < length; i++) {
          targetPlacement.push(this.grid[x][y + i]);
        }
      }

      return targetPlacement.every((value) => value === null);
    })();

    if (!isValidPlacement) return false;

    const ship = new Ship(length);

    if (orientation === "h") {
      for (let i = 0; i < length; i++) {
        this.grid[x][y + i] = ship;
      }
    } else if (orientation === "v") {
      for (let i = 0; i < length; i++) {
        this.grid[x + i][y] = ship;
      }
    }
    return true;
  }

  receiveAttack([x, y]) {}
}

const gb = new Gameboard();
gb.placeShip(3, [0, 1], "h");

console.log(gb);
