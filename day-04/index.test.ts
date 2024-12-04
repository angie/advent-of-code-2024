import { assertEquals } from "@std/assert/equals";
import { part1, part2 } from "./index.ts";

const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

Deno.test("part 1: ", () => {
  assertEquals(part1(testInput), 18);
});

Deno.test.ignore("part 2: ", () => {
  assertEquals(part2(testInput), 1);
});
