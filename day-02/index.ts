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

function isReportSafe(report: number[]): boolean {
  // First determine direction
  const direction = report[0] < report[1] ? "increasing" : "decreasing";

  // Check each pair
  for (let i = 0; i < report.length - 1; i++) {
    const current = report[i];
    const next = report[i + 1];
    const diff = next - current;

    // For increasing sequences
    if (direction === "increasing") {
      if (diff <= 0 || diff > 3) return false;
    } // For decreasing sequences
    else {
      if (diff >= 0 || diff < -3) return false;
    }
  }

  return true;
}

export function part1(data: string): number {
  const reports = getReports(data);
  return reports.filter(isReportSafe).length;
}

console.log("day 2, part 1");
console.log(part1(input));

export function part2(data: string): number {
  return 0;
}
