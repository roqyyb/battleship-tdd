import { it, expect, describe } from "vitest";
import sum from "../src/sum";

describe("sum", () => {
  it("should return sum of a & b", () => {
    expect(sum(1, 3)).toBe(4);
  });
});
