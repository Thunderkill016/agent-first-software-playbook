import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const failures = [];
const textExtensions = new Set(['.md', '.json', '.mjs', '.js', '.ts', '.yml', '.yaml', '.txt']);
const secretPatterns = [
  ['private key', /-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----/],
  ['GitHub classic token', /ghp_[A-Za-z0-9]{20,}/],
  ['GitHub fine-grained token', /github_pat_[A-Za-z0-9_]{20,}/],
  ['OpenAI-style secret', /sk-[A-Za-z0-9_-]{20,}/],
  ['AWS access key', /AKIA[0-9A-Z]{16}/],
  ['Slack token', /xox[baprs]-[A-Za-z0-9-]{20,}/]
];

function trackedFiles() {
  try {
    return execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
  } catch {
    const out = [];
    const walk = (dir) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name === '.git' || entry.name === 'node_modules') continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else out.push(path.relative(root, full));
      }
    };
    walk(root);
    return out;
  }
}

const files = trackedFiles();
for (const rel of files) {
  const base = path.basename(rel);
  if (/^\.env($|\.)/.test(base) && !/\.example$/.test(base)) {
    failures.push(`tracked environment file is unsafe for a public template: ${rel}`);
  }
  if (!textExtensions.has(path.extname(rel)) && !['LICENSE'].includes(base)) continue;
  let text;
  try { text = fs.readFileSync(path.join(root, rel), 'utf8'); } catch { continue; }
  for (const [name, pattern] of secretPatterns) {
    if (pattern.test(text)) failures.push(`${rel}: possible ${name}`);
  }
}

if (failures.length) {
  console.error('Public-safety contract: FAIL');
  for (const failure of failures) console.error(`- ${failure}`);
  console.error('This lightweight scanner is a guardrail, not a replacement for provider secret scanning.');
  process.exit(1);
}

console.log(`Public-safety contract: PASS (${files.length} tracked files inspected)`);
console.log('Note: keep provider secret scanning enabled; this script only catches obvious repository mistakes.');
