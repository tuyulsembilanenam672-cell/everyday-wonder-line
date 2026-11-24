import { mkdirSync, writeFileSync } from "node:fs";

// Everyday Wonder — one sentence about a small moment of wonder.
const SENTENCE =
  "This morning the shadow of my washing line fell across the wall in the shape of a skyline I have never visited, and for a moment my laundry lived in a city I don't know.";

const LIMIT = 200;

const codePoints = [...SENTENCE].length;

if (codePoints < 1 || codePoints > LIMIT) {
  throw new Error(`entry is ${codePoints} code points, must be 1-${LIMIT}`);
}
if (!SENTENCE.trim()) {
  throw new Error("entry must not be only whitespace");
}
if (SENTENCE.trim() !== SENTENCE || /\n/.test(SENTENCE)) {
  throw new Error("entry must be a single line");
}
// Exactly one sentence: a single terminal period, at the very end.
const terminators = (SENTENCE.match(/[.!?]/g) ?? []).length;
if (terminators !== 1 || !SENTENCE.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", SENTENCE, "utf8");
console.log(`Wrote ${codePoints} code points to /output/entry.txt`);
