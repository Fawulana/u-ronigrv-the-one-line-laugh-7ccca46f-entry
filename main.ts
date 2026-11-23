// SPDX-License-Identifier: MIT
// Write one funny line to /output/entry.txt.
//
// The line is an original one-liner for make.fun's "The One-Line Laugh":
// a single sentence, well under 200 characters, built around a surprise
// at the end that still makes sense once it arrives.
// Deterministic, offline, stdlib-only: the same bytes every run.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I turned my phone to grayscale to stop doomscrolling, and now I doomscroll in black and white like it's a classic film.";

function main(): void {
  // The gate allows 1 to 200 characters; refuse to write anything that
  // would fail it rather than emitting a bad entry.
  if (!(LINE.length >= 1 && LINE.length <= 200)) {
    throw new Error(`line is ${LINE.length} chars, outside 1-200`);
  }
  // Exactly one sentence: ends with a single period, no other sentence
  // terminator, and no ". " mid-sentence.
  if (!LINE.endsWith(".") || LINE.endsWith("..")) {
    throw new Error("line must end with a single period");
  }
  if (LINE.includes(". ") || LINE.includes("?") || LINE.includes("!")) {
    throw new Error("line must be exactly one sentence");
  }
  // Keep the line tight for the size tie-break: pure ASCII (so bytes
  // equal characters), no leading/trailing whitespace, no newline or
  // double space anywhere.
  if (!/^[\x20-\x7e]+$/.test(LINE) || LINE !== LINE.trim()) {
    throw new Error("line must be clean single-line ASCII");
  }
  if (LINE.includes("  ")) {
    throw new Error("line must not contain double spaces");
  }
  // No trailing newline: the file holds exactly the line, so the
  // character count the gate sees is the line's length, nothing more.
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE, "utf8");
}

main();
