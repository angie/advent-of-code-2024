import { dirname, fromFileUrl, join } from "@std/path";

const input = await Deno.readTextFile(
  join(dirname(fromFileUrl(import.meta.url)), "./input.txt"),
);

export function part1(data: string) {
  return false;
}

export function part2(data: string) {
  return false;
}
