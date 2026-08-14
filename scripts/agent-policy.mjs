export const policy = Object.freeze({
  schemaVersion: 1,
  canonicalInstructionFile: 'AGENTS.md',
  requiredFiles: [
    'README.md',
    'AGENTS.md',
    'ARCHITECTURE.md',
    'docs/CURRENT_STATE.md',
    'docs/CURRENT_WORK.md',
    'docs/PRODUCT.md',
    'docs/RISK_MODEL.md',
    'docs/WORKFLOW.md',
    'docs/context/README.md',
    'docs/engineering/AGENT_OPERATING_MODEL.md',
    'docs/engineering/RESEARCH_PROTOCOL.md',
    'docs/engineering/VERIFICATION_MATRIX.md',
    'docs/FAILURE_REGISTER.md',
    'docs/QUALITY_SCORE.md',
    'templates/AGENT_TASK.md',
    'templates/WORK_PACKET.md',
    'templates/HANDOFF.md'
  ],
  currentWorkSections: [
    'NOW',
    'NEXT',
    'BLOCKED',
    'OWNER DECISION',
    'HOLD',
    'RECENTLY DONE'
  ],
  riskClasses: {
    0: {
      name: 'docs/mechanical',
      evidence: ['knowledge contract', 'public-safety contract', 'diff hygiene']
    },
    1: {
      name: 'bounded executable change',
      evidence: ['Class 0', 'focused tests', 'static/build checks as applicable']
    },
    2: {
      name: 'user flow/UI/multi-component behavior',
      evidence: ['Class 1', 'running-flow proof', 'responsive/accessibility evidence when applicable']
    },
    3: {
      name: 'security/data/auth/financial/CI/provider/operations',
      evidence: ['explicit plan', 'rollback', 'boundary tests', 'fresh evaluation', 'exact-head verification', 'production/provider proof when applicable']
    }
  },
  permissionScopes: [
    'read_only',
    'branch_write',
    'provider_read',
    'provider_write_approved',
    'production_data_write_approved'
  ],
  alwaysChecks: ['npm run check:knowledge', 'npm run check:public-safety'],
  stableCheckName: 'playbook-policy'
});
