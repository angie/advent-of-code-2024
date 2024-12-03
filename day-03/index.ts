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
  const memory = getInput(data);
  const validInstructions = [...memory.matchAll(/(mul\(\d{1,3},\d{1,3}\))/g)];
  const enableIndices = new Set(
    [...memory.matchAll(/(do\(\))/g)].map((e) => e.index),
  );
  const disableIndices = new Set(
    [...memory.matchAll(/(don't\(\))/g)].map((d) => d.index),
  );
  let total = 0;
  let currentInstructionIdx = -1;
  // start enabled
  let isEnabled = true;

  for (const instruction of validInstructions) {
    while (currentInstructionIdx < instruction.index) {
      currentInstructionIdx += 1;

      // find latest instruction
      if (enableIndices.has(currentInstructionIdx)) {
        isEnabled = true;
      }

      if (disableIndices.has(currentInstructionIdx)) {
        isEnabled = false;
      }
    }

    if (isEnabled) {
      const [a, b] = instruction[0].match(/\d+/g)?.map(Number) ?? [0, 0];

      total += a * b;
    }
  }

  return total;
}

console.log("day 3, part 2");
console.log(part2(input));
