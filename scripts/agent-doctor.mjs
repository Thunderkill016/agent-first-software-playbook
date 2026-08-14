import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { policy } from './agent-policy.mjs';

const json = process.argv.includes('--json');

function exists(rel) {
  return fs.existsSync(rel);
}

function git(args) {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return null;
  }
}

const missing = policy.requiredFiles.filter((rel) => !exists(rel));
const branch = git(['branch', '--show-current']);
const head = git(['rev-parse', 'HEAD']);
const status = git(['status', '--porcelain']) || '';
const changedFiles = status.split('\n').filter(Boolean).map((line) => line.slice(3));

function suggestedRisk(files) {
  if (!files.length) return { risk: null, reason: 'No uncommitted files to classify; classify the actual requested diff.' };
  if (files.some((f) => /(^|\/)(\.github\/workflows|SECURITY\.md)|agent-contract\.json|scripts\/agent-(policy|doctor)/.test(f))) {
    return { risk: 3, reason: 'CI/security/agent-policy boundary detected.' };
  }
  if (files.every((f) => /\.(md|txt)$/.test(f))) return { risk: 0, reason: 'Documentation-only working tree.' };
  if (files.some((f) => /(components?|views?|styles?|\.css$|\.scss$)/i.test(f))) return { risk: 2, reason: 'Likely user-interface/shared presentation boundary.' };
  return { risk: 1, reason: 'Executable or mixed bounded change; escalate if consequence/permissions require it.' };
}

const risk = suggestedRisk(changedFiles);
const result = {
  ok: missing.length === 0,
  schemaVersion: policy.schemaVersion,
  canonicalInstructionFile: policy.canonicalInstructionFile,
  contextRouter: policy.contextRouter,
  branch,
  head,
  changedFiles,
  suggestedRisk: risk.risk,
  suggestedRiskReason: risk.reason,
  missingRequiredFiles: missing,
  permissionScopes: policy.permissionScopes,
  alwaysChecks: policy.alwaysChecks,
  stableCheckName: policy.stableCheckName,
  note: 'Diagnostic only: it grants no permission and does not prove merge/deployment readiness.',
  next: missing.length
    ? 'Repair repository knowledge routing before implementation.'
    : 'Read affected files, CURRENT_STATE, CURRENT_WORK and routed context; then confirm risk and permissions against the actual task.'
};

if (json) console.log(JSON.stringify(result, null, 2));
else {
  console.log(`Agent readiness: ${result.ok ? 'PASS' : 'FAIL'}`);
  console.log(`Instruction authority: ${result.canonicalInstructionFile}`);
  console.log(`Context router: ${result.contextRouter}`);
  if (branch) console.log(`Branch: ${branch}`);
  if (head) console.log(`Head: ${head}`);
  if (risk.risk !== null) console.log(`Suggested risk: Class ${risk.risk} — ${risk.reason}`);
  if (missing.length) console.log(`Missing: ${missing.join(', ')}`);
  console.log(`Always run: ${policy.alwaysChecks.join(' ; ')}`);
  console.log(`Next: ${result.next}`);
}

process.exitCode = result.ok ? 0 : 1;
