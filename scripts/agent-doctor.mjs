import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { policy } from './agent-policy.mjs';

const json = process.argv.includes('--json');

function exists(path) {
  return fs.existsSync(path);
}

function git(args) {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return null;
  }
}

const missing = policy.requiredFiles.filter((path) => !exists(path));
const branch = git(['branch', '--show-current']);
const head = git(['rev-parse', 'HEAD']);
const changed = (git(['status', '--porcelain']) || '')
  .split('\n')
  .filter(Boolean)
  .map((line) => line.slice(3));

const result = {
  ok: missing.length === 0,
  schemaVersion: policy.schemaVersion,
  canonicalInstructionFile: policy.canonicalInstructionFile,
  branch,
  head,
  changedFiles: changed,
  missingRequiredFiles: missing,
  alwaysChecks: policy.alwaysChecks,
  stableCheckName: policy.stableCheckName,
  permissionScopes: policy.permissionScopes,
  next: missing.length
    ? 'Repair repository knowledge routing before implementation.'
    : 'Read AGENTS.md, affected files, CURRENT_STATE and CURRENT_WORK; then classify risk and permissions.'
};

if (json) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`Agent readiness: ${result.ok ? 'PASS' : 'FAIL'}`);
  console.log(`Instruction authority: ${result.canonicalInstructionFile}`);
  if (branch) console.log(`Branch: ${branch}`);
  if (head) console.log(`Head: ${head}`);
  if (missing.length) console.log(`Missing: ${missing.join(', ')}`);
  console.log(`Always run: ${policy.alwaysChecks.join(' ; ')}`);
  console.log(`Next: ${result.next}`);
}

process.exitCode = result.ok ? 0 : 1;
