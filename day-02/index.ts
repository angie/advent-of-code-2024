import { dirname, fromFileUrl, join } from "@std/path";

const input = await Deno.readTextFile(
  join(dirname(fromFileUrl(import.meta.url)), "./input.txt"),
);

function getReports(data: string): Array<Array<number>> {
  const reports: Array<Array<number>> = [];

  data.trim().split("\n").forEach((line: string) => {
    const level = line.split(/\s+/).map(Number);

    reports.push(level);
  });

  return reports;
}

function isSafePair(current: number, next: number, direction: string): boolean {
  const diff = next - current;

  if (direction === "increasing") {
    if (diff <= 0 || diff > 3) return false;
  } else if (diff >= 0 || diff < -3) {
    return false;
  }
  return true;
}

function isReportSafe(report: number[]): boolean {
  // First determine direction
  const direction = report[0] < report[1] ? "increasing" : "decreasing";

  // Check each pair
  for (let i = 0; i < report.length - 1; i++) {
    const current = report[i];
    const next = report[i + 1];

    if (!isSafePair(current, next, direction)) {
      return false;
    }
  }

  return true;
}

function isReportSafeWithDampner(report: number[]): boolean {
  // If already safe, no need to remove anything
  if (isReportSafe(report)) return true;

  // Try removing each number once
  for (let skipIdx = 0; skipIdx < report.length; skipIdx++) {
    // Check sequence without this number
    let isValid = true;
    let direction: string | null = null;

    // Check all pairs except those involving the skipped number
    for (let i = 0; i < report.length - 1; i++) {
      if (i === skipIdx) continue;
      let next = i + 1;
      if (next === skipIdx) next++;
      if (next >= report.length) break;

      // Determine direction from first valid pair
      if (direction === null) {
        direction = report[i] < report[next] ? "increasing" : "decreasing";
      }

      if (!isSafePair(report[i], report[next], direction)) {
        isValid = false;
        break;
      }
    }

    if (isValid) return true;
  }

  return false;
}

export function part1(data: string): number {
  const reports = getReports(data);
  return reports.filter(isReportSafe).length;
}

export function part2(data: string): number {
  const reports = getReports(data);
  return reports.filter(isReportSafeWithDampner).length;
}

console.log("day 2, part 2");
console.log(part2(input));
