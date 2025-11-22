import Ship from "./ship.mjs";

export default class GameBoard {
  constructor() {
    this.grid = new Array(10).fill("").map((_) => new Array(10).fill(null));
    this.ships = [];
  }

  isValidPlacement(x, y, length, orientation) {
    // console.log(x, y);
    if (
      (orientation === "v" && length + x > 10) ||
      (orientation === "h" && length + y > 10)
    ) {
      return false;
    }

    if (!this.areTargetPointsFree(x, y, length, orientation)) {
      return false;
    }

    return true;
  }

  areTargetPointsFree(x, y, length, orientation) {
    const pointsToOccuppy = [];

    if (orientation === "v") {
      for (let i = 0; i < length; i++) {
        pointsToOccuppy.push(this.grid[x + i][y]);
      }
    }
    if (orientation === "h") {
      for (let i = 0; i < length; i++) {
        pointsToOccuppy.push(this.grid[x][y + i]);
      }
    }
    return pointsToOccuppy.every((point) => point === null);
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

    if (!this.isValidPlacement(x, y, length, orientation)) return false;

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
    // add new ship to ships
    this.ships.push(ship);
    return true;
  }

  receiveAttack([x, y]) {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      throw new Error("Invalid coordinate!");
    }

    const targetCell = this.grid[x][y];

    if (targetCell === null) {
      // record shot
      this.grid[x][y] = 0;
      return false;
    }
    if (targetCell instanceof Ship) {
      // send attack to target ship
      this.grid[x][y].hit();
      // handle sunk
      if (this.grid[x][y].isSunk()) {
        this.grid[x][y] = 1;
        return "sunk";
      }
      // record shot
      this.grid[x][y] = 1;
      return true;
    }
  }
}
