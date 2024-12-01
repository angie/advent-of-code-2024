import { dirname, fromFileUrl, join } from "@std/path";

const input = await Deno.readTextFile(
  join(dirname(fromFileUrl(import.meta.url)), "./input.txt"),
);

function getSortedLists(data: string): [Array<number>, Array<number>] {
  const left: Array<number> = [];
  const right: Array<number> = [];

  data.trim().split("\n").forEach((line) => {
    const [l, r] = line.split(/\s+/);

    left.push(parseInt(l));
    right.push(parseInt(r));
  });

  const sortedLeft = left.toSorted();
  const sortedRight = right.toSorted();

  return [sortedLeft, sortedRight];
}

export function part1(data: string): number {
  const [sortedLeft, sortedRight] = getSortedLists(data);

  let distance = 0;
  for (let i = 0; i < sortedLeft.length; i++) {
    distance += Math.abs(sortedLeft[i] - sortedRight[i]);
  }

  return distance;
}

console.log("Day 1, part 1");
console.log(part1(input));

export function part2(data: string): number {
  const [left, right] = getSortedLists(data);

  const rightCountMap: Record<string, number> = {};

  for (let i = 0; i < right.length; i++) {
    if (rightCountMap[right[i]]) {
      rightCountMap[right[i]] += 1;
    } else {
      rightCountMap[right[i]] = 1;
    }
  }

  let similarityScore = 0;

  for (let j = 0; j < left.length; j++) {
    const count = rightCountMap[left[j]];

    similarityScore += left[j] * (count || 0);
  }
  return similarityScore;
}

console.log("Day 1, part 2");
console.log(part2(input));
