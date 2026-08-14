import fs from 'node:fs';

const url = new URL('../agent-contract.json', import.meta.url);
export const policy = Object.freeze(JSON.parse(fs.readFileSync(url, 'utf8')));
