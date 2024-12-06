import { dirname, fromFileUrl, join } from "@std/path";

const input = await Deno.readTextFile(
  join(dirname(fromFileUrl(import.meta.url)), "./input.txt"),
);

function buildMap(
  data: string,
): {
  start: number[];
  obstacles: Map<number, Set<number>>;
  length: number;
  width: number;
} {
  const rows = data.trim().split("\n");
  const obstacles: Map<number, Set<number>> = new Map();
  let start: number[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    for (let j = 0; j < row.length; j++) {
      if (rows[i][j] === "#") {
        // add to obstacles map
        if (!obstacles.has(i)) {
          obstacles.set(i, new Set());
        }

        obstacles.get(i)?.add(j);
      }

      if (rows[i][j] === "^") {
        start = [i, j];
      }
    }
  }

  return { start, obstacles, length: rows.length, width: rows[0].length };
}

export function part1(data: string) {
  const { start, obstacles, length, width } = buildMap(data);
  const directions = [
    [-1, 0], // up
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
  ] as const;
  let currentDirection = 0;
  let moves = -1;
  const visited = new Map<number, Set<number>>();
  let isWithinMap = true;
  let [x, y] = start;

  while (isWithinMap) {
    if (!visited.get(x)) {
      visited.set(x, new Set());
    }
    visited.get(x)?.add(y);

    // find next obstacle
    const nextX = x + directions[currentDirection][0];
    const nextY = y + directions[currentDirection][1];

    // check if move means guard leaves the map
    if (nextX < 0 || nextX > length || nextY < 0 || nextY > width) {
      isWithinMap = false;
    }

    // if we hit an obstacle, change direction
    if (obstacles.get(nextX)?.has(nextY)) {
      currentDirection = (currentDirection + 1) % directions.length;
    } else {
      // or if there is no obstacle in our way, keep moving
      x = nextX;
      y = nextY;
    }

    if (!visited.get(x)?.has(y)) {
      moves++;
    }
  }

  // console.log("obstacles :>> ", obstacles);
  // console.log("start :>> ", start);
  // console.log("visited :>> ", visited);

  return moves;
}

console.log("day 6, part 1");
console.log(part1(input));

export function part2(data: string) {
  return 0;
}

// console.log("day x, part 2")
// console.log(part2(input))
