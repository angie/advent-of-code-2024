import { dirname, fromFileUrl, join } from "@std/path";

const input = await Deno.readTextFile(
  join(dirname(fromFileUrl(import.meta.url)), "./input.txt"),
);

type TwoDimensionalArray = number[][];

function getRules(ruleSection: string): Map<number, number[]> {
  const rules = ruleSection.split("\n").map((r) => r.split("|").map(Number));

  // create graph of rules
  const graph = new Map<number, number[]>();
  for (const [before, after] of rules) {
    if (!graph.has(before)) {
      graph.set(before, []);
    }

    graph.get(before)?.push(after);
  }

  return graph;
}

function getPrintingOrder(orderSection: string): TwoDimensionalArray {
  return orderSection.split("\n").map((o) => o.split(",").map(Number));
}

function getRulesAndOrder(
  data: string,
): [Map<number, number[]>, TwoDimensionalArray] {
  const sections = data.trim().split("\n\n");
  return [getRules(sections[0]), getPrintingOrder(sections[1])];
}

function hasPath(
  graph: Map<number, number[]>,
  start: number,
  end: number,
  validPages: Set<number>,
): boolean {
  if (!validPages.has(start) || !validPages.has(end)) {
    return false;
  }

  const visited = new Set<number>();
  const stack = [start];

  while (stack.length > 0) {
    const current = stack.pop()!;
    if (current === end) return true;
    if (visited.has(current)) continue;
    visited.add(current);

    const nextPages = graph.get(current) || [];
    for (const next of nextPages) {
      // Only follow paths through pages that exist in our order
      if (!visited.has(next) && validPages.has(next)) {
        stack.push(next);
      }
    }
  }
  return false;
}

export function part1(data: string) {
  // process input
  const [rules, orders] = getRulesAndOrder(data);

  function isValidOrder(
    graph: Map<number, number[]>,
    order: number[],
  ): boolean {
    const validPages = new Set(order);

    for (let i = 0; i < order.length; i++) {
      const currentPage = order[i];
      for (let j = i + 1; j < order.length; j++) {
        const laterPage = order[j];
        // Check if later page must come before current page
        if (hasPath(graph, laterPage, currentPage, validPages)) {
          return false;
        }
      }
    }
    return true;
  }

  // check if order is valid
  const validOrders = orders.filter((order) => isValidOrder(rules, order));

  return validOrders.reduce((prev, curr) => {
    // find middle element of valid order
    const middleIdx = Math.floor(curr.length / 2);

    // ... and add its value to running total
    return prev += curr[middleIdx];
  }, 0);
}

console.log("day 5, part 1");
console.log(part1(input));

export function part2(data: string) {
  return 0;
}

// console.log("day x, part 2")
// console.log(part2(input))
