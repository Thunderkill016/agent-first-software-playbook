import fs from 'node:fs';
import path from 'node:path';
import { policy } from './agent-policy.mjs';

const root = process.cwd();
const failures = [];

function full(rel) { return path.join(root, rel); }
function read(rel) { return fs.readFileSync(full(rel), 'utf8'); }
function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}

for (const rel of policy.requiredFiles) {
  if (!fs.existsSync(full(rel))) failures.push(`missing required file: ${rel}`);
}

if (fs.existsSync(full('AGENTS.md'))) {
  const agents = read('AGENTS.md');
  const lines = agents.split('\n').length;
  if (lines > policy.maxHotInstructionLines) failures.push(`AGENTS.md is ${lines} lines; hot-context limit is ${policy.maxHotInstructionLines}`);
  for (const marker of ['## Authority order', '## First-run algorithm', '## Risk', '## Permission scopes', '## Exact-head rule', '## Completion']) {
    if (!agents.includes(marker)) failures.push(`AGENTS.md missing load-bearing marker: ${marker}`);
  }
  if (!agents.includes('npm run agent:doctor')) failures.push('AGENTS.md must route through agent:doctor');
}

if (fs.existsSync(full('docs/CURRENT_WORK.md'))) {
  const work = read('docs/CURRENT_WORK.md');
  for (const section of policy.currentWorkSections) {
    if (!work.includes(`## ${section}`)) failures.push(`CURRENT_WORK missing section: ${section}`);
  }
}

const adapters = [
  ['CLAUDE.md', 'AGENTS.md'],
  ['GEMINI.md', 'AGENTS.md'],
  ['.github/copilot-instructions.md', 'AGENTS.md'],
  ['.aider.conf.yml', 'AGENTS.md']
];
for (const [rel, marker] of adapters) {
  if (!fs.existsSync(full(rel))) { failures.push(`missing agent adapter: ${rel}`); continue; }
  const text = read(rel);
  if (!text.includes(marker)) failures.push(`${rel} must route to ${marker}`);
  if (rel.endsWith('.md') && text.split('\n').length > 40) failures.push(`${rel} is too large for a thin adapter`);
}

const issueTemplate = '.github/ISSUE_TEMPLATE/agent-task.md';
if (fs.existsSync(full(issueTemplate))) {
  const head = read(issueTemplate).split('\n').slice(0, 12).join('\n');
  if (!/^name:/m.test(head) || !/^about:/m.test(head)) failures.push(`${issueTemplate} needs valid name: and about: frontmatter`);
}

const workflowDir = full('.github/workflows');
if (fs.existsSync(workflowDir)) {
  for (const file of walk(workflowDir).filter((f) => /\.ya?ml$/.test(f))) {
    const text = fs.readFileSync(file, 'utf8');
    if (!/permissions:\s*\n\s+contents:\s*read/m.test(text)) failures.push(`${path.relative(root, file)} must declare least-privilege contents: read`);
    const uses = [...text.matchAll(/uses:\s*([^\s#]+)/g)].map((m) => m[1]);
    for (const value of uses) {
      if (value.startsWith('./')) continue;
      const at = value.lastIndexOf('@');
      const ref = at >= 0 ? value.slice(at + 1) : '';
      if (!/^[a-f0-9]{40}$/i.test(ref)) failures.push(`${path.relative(root, file)} action is not pinned to full SHA: ${value}`);
    }
  }
}

const markdownFiles = walk(root).filter((f) => f.endsWith('.md'));
const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
for (const file of markdownFiles) {
  const text = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = linkPattern.exec(text))) {
    let target = match[1].trim();
    if (!target || /^(https?:|mailto:|#)/i.test(target)) continue;
    target = target.split(/\s+/)[0].replace(/^<|>$/g, '').split('#')[0].split('?')[0];
    if (!target) continue;
    try { target = decodeURIComponent(target); } catch {}
    const resolved = target.startsWith('/') ? path.join(root, target.slice(1)) : path.resolve(path.dirname(file), target);
    if (!resolved.startsWith(root)) failures.push(`${path.relative(root, file)} links outside repository: ${match[1]}`);
    else if (!fs.existsSync(resolved)) failures.push(`${path.relative(root, file)} has broken local link: ${match[1]}`);
  }
}

if (failures.length) {
  console.error('Knowledge contract: FAIL');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Knowledge contract: PASS (${markdownFiles.length} markdown files checked)`);
