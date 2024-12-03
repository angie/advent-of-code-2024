import { dirname, fromFileUrl, join } from "@std/path";

const input = await Deno.readTextFile(
  join(dirname(fromFileUrl(import.meta.url)), "./input.txt"),
);

function getInput(data: string): string {
  return data.trim();
}

export function part1(data: string): number {
  const memory = getInput(data);
  const validInstruction = /(mul\(\d{1,3},\d{1,3}\))/g;
  const validInstructions = memory.match(validInstruction) ?? [];
  let total = 0;

  for (const instruction of validInstructions) {
    const [a, b] = instruction.match(/\d+/g)?.map(Number) as Array<number>;

    total += a * b;
  }

  return total;
}

console.log("day 3, part 1");
console.log(part1(input));

export function part2(data: string): number {
  return 0;
}
