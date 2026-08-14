import assert from 'node:assert/strict';
import test from 'node:test';

import { pickNextTask } from '../src/next-task.mjs';

test('returns null when no task is ready', () => {
  assert.equal(
    pickNextTask([
      { title: 'Blocked', status: 'blocked', priority: 'high' },
      { title: 'Done', status: 'done', priority: 'low' },
    ]),
    null,
  );
});

test('never selects blocked or done work', () => {
  const selected = pickNextTask([
    { title: 'Blocked urgent task', status: 'blocked', priority: 'high' },
    { title: 'Ready normal task', status: 'ready', priority: 'medium' },
    { title: 'Completed task', status: 'done', priority: 'high' },
  ]);

  assert.deepEqual(selected, {
    title: 'Ready normal task',
    status: 'ready',
    priority: 'medium',
  });
});

test('prefers higher priority among ready tasks', () => {
  const selected = pickNextTask([
    { title: 'Low', status: 'ready', priority: 'low' },
    { title: 'High', status: 'ready', priority: 'high' },
    { title: 'Medium', status: 'ready', priority: 'medium' },
  ]);

  assert.equal(selected?.title, 'High');
});

test('preserves input order when ready priorities are equal', () => {
  const selected = pickNextTask([
    { title: 'First', status: 'ready', priority: 'medium' },
    { title: 'Second', status: 'ready', priority: 'medium' },
  ]);

  assert.equal(selected?.title, 'First');
});
