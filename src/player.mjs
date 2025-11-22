import Gameboard from "./gameboard.mjs";

export default class Player {
  constructor(type) {
    this.type = type ? type : "computer";
    this.gameboard = new Gameboard();
  }
}
