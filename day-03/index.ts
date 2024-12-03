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
    const [a, b] = instruction.match(/\d+/g)?.map(Number) ?? [0, 0];

    total += a * b;
  }

  return total;
}

console.log("day 3, part 1");
console.log(part1(input));

export function part2(data: string): number {
  const memory = getInput(data);
  const MUL = "mul\\(\\d{1,3},\\d{1,3}\\)";
  const DO = "do\\(\\)";
  const DONT = "don't\\(\\)";

  const validInstructions =
    memory.match(new RegExp(`${MUL}|${DO}|${DONT}`, "g")) ?? [];
  let total = 0;
  let isEnabled = true;

  for (const instruction of validInstructions) {
    if (instruction.match(DO)) {
      isEnabled = true;
    }

    if (instruction.match(DONT)) {
      isEnabled = false;
    }

    if (isEnabled && instruction.match(MUL)) {
      const [a, b] = instruction.match(/\d+/g)?.map(Number) ?? [0, 0];

      total += a * b;
    }
  }

  return total;
}

console.log("day 3, part 2");
console.log(part2(input));
