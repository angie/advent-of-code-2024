import { assertEquals } from "@std/assert/equals";
import { part1 } from "./index.ts";

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

Deno.test("part 1: determines whether or not reports are safe", () => {
  assertEquals(part1(testInput), 2);
});
