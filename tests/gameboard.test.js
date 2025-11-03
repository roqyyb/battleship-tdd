import { it, expect, describe, beforeEach } from "vitest";
import Gameboard from "../src/gameboard";

describe("Gameboard", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });

  it("grid should return a 10 by 10 grid with each cell equal to null", () => {
    expect(Array.isArray(gameboard.grid)).toBe(true);

    gameboard.grid.forEach((row) => {
      expect(row.every((cell) => cell === null)).toBe(true);
    });
  });

  it("placeShip throw an error if given invalid coordinates", () => {
    expect(() => gameboard.placeShip(5, [-1, 0], "h")).toThrow(/invalid/i);
    expect(() => gameboard.placeShip(5, [0, -1], "h")).toThrow(/invalid/i);
    expect(() => gameboard.placeShip(5, [10, 0], "h")).toThrow(/invalid/i);
    expect(() => gameboard.placeShip(5, [0, 10], "h")).toThrow(/invalid/i);
  });

  it("placeShip throw an error if ship length is greater than the target space", () => {
    expect(() => gameboard.placeShip(4, [7, 0], "v")).toThrow(/invalid/i);
    expect(() => gameboard.placeShip(4, [0, 7], "h")).toThrow(/invalid/i);
  });

  it("placeShip should return false if given valid agrs but there's an overlap", () => {
    gameboard.placeShip(3, [0, 0], "h");

    expect(gameboard.placeShip(2, [0, 2], "h")).toBe(false);
  });

  it("placeShip should return true if given valid args and there's no overlap", () => {
    expect(gameboard.placeShip(3, [0, 0], "h")).toBe(true);
    expect(gameboard.placeShip(3, [1, 0], "v")).toBe(true);
  });

  it("receiveAttack should throw an errow if given invalid coordinates", () => {
    expect(() => gameboard.receiveAttack([-1, 9])).toThrow(/invalid/i);
  });

  it("receiveAttack should send attack to target ship and return true if given a valid ship coordinate", () => {
    gameboard.placeShip(5, [1, 0], "v");
    gameboard.placeShip(3, [6, 2], "v");
    gameboard.placeShip(2, [1, 2], "h");
    gameboard.placeShip(3, [4, 4], "h");
    gameboard.placeShip(4, [7, 6], "h");

    expect(gameboard.receiveAttack([1, 2])).toBe(true);
    expect(gameboard.receiveAttack([1, 2])).toBe(undefined);

    expect(gameboard.receiveAttack([1, 3])).toBe(true);
    expect(gameboard.receiveAttack([1, 3])).toBe(undefined);
  });

  it("receiveAttack should record shot and return false when given a valid coordinates", () => {
    expect(gameboard.receiveAttack([2, 5])).toBe(false);
    expect(gameboard.receiveAttack([2, 5])).toBe(undefined);

    expect(gameboard.receiveAttack([0, 1])).toBe(false);
    expect(gameboard.receiveAttack([0, 1])).toBe(undefined);
  });
});
