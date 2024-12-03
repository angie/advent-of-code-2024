import { dirname, fromFileUrl, join } from "@std/path";

const input = await Deno.readTextFile(
  join(dirname(fromFileUrl(import.meta.url)), "./input.txt"),
);

export function part1(data: string) {
  return 0;
}

// console.log("day x, part 1")
// console.log(part1(input))

export function part2(data: string) {
  return 0;
}

// console.log("day x, part 2")
// console.log(part1(input))
