import { it, expect, describe, beforeEach } from "vitest";
import Player from "../src/player.mjs";

describe("Player", () => {
  let player;
  beforeEach(() => (player = new Player()));

  it("should have type property", () => {
    expect(player).toHaveProperty("type");
  });

  it("should have gameboard property", () => {
    expect(player).toHaveProperty("gameboard");
  });
});
