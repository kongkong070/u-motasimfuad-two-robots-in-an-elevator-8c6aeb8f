// Two Robots in an Elevator — one line of awkward robot small talk.
//
// The entry is a single line a robot says to another robot while they ride
// an elevator together. It leans on machine logic (running a diagnostic on
// a silence) to make the awkwardness land, and it stays well inside the
// gate: one line, 1-200 characters, plain UTF-8 text.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I ran a diagnostic on this silence. Results: 98% awkward, 2% elevator music, and 100% me pretending I have somewhere to be on floor 12.";

function validate(entry: string): void {
  if (typeof entry !== "string") {
    throw new Error("entry must be a string");
  }
  // Count real characters (code points), not UTF-16 units, so the gate's
  // 200-character limit is checked the way a reader would count it.
  const chars = [...entry].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Never remove the output directory itself: the grader may mount it.
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
  console.log(`wrote entry.txt (${ENTRY.length} chars)`);
}

main();
