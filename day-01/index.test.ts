import { assertEquals } from "@std/assert";
import { part1, part2 } from "./index.ts";

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

Deno.test("part 1: finds total distance between lists", () => {
  const actual = part1(testInput);

  assertEquals(actual, 11);
});

Deno.test("part 2: finds similarity score between lists", () => {
  const actual = part2(testInput);

  assertEquals(actual, 31);
});
