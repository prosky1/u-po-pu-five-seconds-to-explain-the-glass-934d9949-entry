import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY_TEXT = "It fell with such confidence I can only assume it had been planning this longer than I have.";
const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;
const MIN_CHARS = 1;

function validateEntry(text: string): void {
  const chars = [...text];
  if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
    throw new Error(`entry length ${chars.length} outside ${MIN_CHARS}-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
  const sentenceEndings = text.match(/[.!?]+/g) ?? [];
  if (sentenceEndings.length !== 1 || !/[.!?]$/.test(text.trim())) {
    throw new Error("entry must be exactly one sentence");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
}

function writeEntry(): void {
  validateEntry(ENTRY_TEXT);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY_TEXT, "utf8");
}

writeEntry();
