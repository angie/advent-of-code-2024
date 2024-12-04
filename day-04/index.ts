import { dirname, fromFileUrl, join } from "@std/path";

const input = await Deno.readTextFile(
  join(dirname(fromFileUrl(import.meta.url)), "./input.txt"),
);

type Grid = string[][];

function getWordSearchGrid(data: string): Grid {
  return data.trim().split("\n").map((line) => line.split(""));
}

const directions = [
  [0, 1], // right
  [1, 1], // down, right
  [1, 0], // down
  [1, -1], // down left
  [0, -1], // left
  [-1, -1], // up left
  [-1, 0], // up
  [-1, 1], // up right
] as const;

function countXmasMatchesFromPosition(
  grid: Grid,
  x: number,
  y: number,
): number {
  let count = 0;
  for (const [dx, dy] of directions) {
    const mPos = [x + dx, y + dy];
    const aPos = [x + (2 * dx), y + (2 * dy)];
    const sPos = [x + (3 * dx), y + (3 * dy)];
    try {
      const m = grid[mPos[0]][mPos[1]];
      const a = grid[aPos[0]][aPos[1]];
      const s = grid[sPos[0]][sPos[1]];
      if (["X", m, a, s].join("") === "XMAS") {
        count++;
      }
    } catch (_error) {
      // a position was out of bounds, so can't be a match
      continue;
    }
  }
  return count;
}

export function part1(data: string) {
  const grid = getWordSearchGrid(data);
  let counter = 0;

  // find all co-ordinates of starting letter "X" from which to start our search
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "X") {
        counter += countXmasMatchesFromPosition(grid, i, j);
      }
    }
  }

  return counter;
}

console.log("day 4, part 1");
console.log(part1(input));

export function part2(data: string) {
  return 0;
}

// console.log("day x, part 2")
// console.log(part1(input))
