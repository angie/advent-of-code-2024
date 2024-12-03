import { assertEquals } from "@std/assert/equals";
import { part1, part2 } from "./index.ts";

const inputP1 =
  `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

Deno.test("part 1: sums multiplications", () => {
  assertEquals(part1(inputP1), 161);
});

const inputP2 =
  `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

Deno.test(
  "part 2: sums multiplications with do/do not instructions",
  () => {
    assertEquals(part2(inputP2), 48);
  },
);
