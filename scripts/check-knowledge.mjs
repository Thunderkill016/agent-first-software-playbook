import fs from 'node:fs';
import path from 'node:path';
import { policy } from './agent-policy.mjs';

const root = process.cwd();
const failures = [];

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

for (const rel of policy.requiredFiles) {
  if (!fs.existsSync(path.join(root, rel))) failures.push(`missing required file: ${rel}`);
}

if (fs.existsSync(path.join(root, 'docs/CURRENT_WORK.md'))) {
  const currentWork = read('docs/CURRENT_WORK.md');
  for (const section of policy.currentWorkSections) {
    if (!currentWork.includes(`## ${section}`)) failures.push(`CURRENT_WORK missing section: ${section}`);
  }
}

if (fs.existsSync(path.join(root, 'AGENTS.md'))) {
  const agents = read('AGENTS.md');
  for (const marker of ['## Authority order', '## First-run algorithm', '## Risk', '## Exact-head rule', '## Completion']) {
    if (!agents.includes(marker)) failures.push(`AGENTS.md missing load-bearing marker: ${marker}`);
  }
  if (!agents.includes('npm run agent:doctor')) failures.push('AGENTS.md must route agents through npm run agent:doctor');
}

const adapters = [
  ['CLAUDE.md', 'AGENTS.md'],
  ['GEMINI.md', 'AGENTS.md'],
  ['.github/copilot-instructions.md', 'AGENTS.md']
];
for (const [rel, authority] of adapters) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    failures.push(`missing cross-agent adapter: ${rel}`);
    continue;
  }
  if (!fs.readFileSync(full, 'utf8').includes(authority)) failures.push(`${rel} must point to ${authority}`);
}

const markdownFiles = walk(root).filter((file) => file.endsWith('.md'));
const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
for (const file of markdownFiles) {
  const text = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = linkPattern.exec(text))) {
    let target = match[1].trim();
    if (!target || /^(https?:|mailto:|#)/i.test(target)) continue;
    target = target.split(/\s+/)[0].replace(/^<|>$/g, '');
    target = target.split('#')[0].split('?')[0];
    if (!target) continue;
    try { target = decodeURIComponent(target); } catch {}
    const resolved = target.startsWith('/')
      ? path.join(root, target.slice(1))
      : path.resolve(path.dirname(file), target);
    if (!resolved.startsWith(root)) {
      failures.push(`${path.relative(root, file)} links outside repository: ${match[1]}`);
    } else if (!fs.existsSync(resolved)) {
      failures.push(`${path.relative(root, file)} has broken local link: ${match[1]}`);
    }
  }
}

if (failures.length) {
  console.error('Knowledge contract: FAIL');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Knowledge contract: PASS (${markdownFiles.length} markdown files checked)`);
