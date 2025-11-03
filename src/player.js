import Gameboard from "./gameboard";

export default class Player {
  constructor(type) {
    this.type = type ? type : "computer";
    this.gameboard = new Gameboard();
  }
}
