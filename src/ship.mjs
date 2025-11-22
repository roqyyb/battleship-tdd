class Ship {
  constructor(length) {
    this.hits = 0;
    this.length = length;
  }

  hit() {
    if (this.hits === this.length) {
      throw new Error("Ship is already sunk!");
    }
    return ++this.hits;
  }

  isSunk() {
    return this.length === this.hits;
  }
}

export default Ship;
