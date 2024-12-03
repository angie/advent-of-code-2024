import { assertEquals } from "@std/assert/equals";
import { part1, part2 } from "./index.ts";

const testInput =
  `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

Deno.test("part 1: sums multiplications", () => {
  assertEquals(part1(testInput), 161);
});

Deno.test.ignore(
  "part 2: sums multiplications with do/do not instructions",
  () => {
    assertEquals(part2(testInput), 48);
  },
);
