import { beforeEach, expect, describe, it } from "vitest";
import Ship from "../src/ship";

describe("Ship", () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(1);
  });

  it("hit should increment hits by 1", () => {
    expect(ship.hits).toBe(0);
    expect(ship.hit()).toBe(1);
  });

  it("hit should throw an error if called after ship is sunk", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(true);
    expect(() => ship.hit()).toThrow(/sunk/i);
  });

  it("isSunk should return false if hits is less than length", () => {
    expect(ship.isSunk()).toBe(false);
  });

  it("isSunk should return true if length is equal to hits", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
