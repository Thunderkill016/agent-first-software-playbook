const PRIORITY_RANK = Object.freeze({
  high: 0,
  medium: 1,
  low: 2,
});

export function pickNextTask(tasks) {
  const candidates = tasks
    .filter((task) => task.status === 'ready')
    .map((task, index) => ({ task, index }))
    .sort((a, b) => {
      const priorityDelta = PRIORITY_RANK[a.task.priority] - PRIORITY_RANK[b.task.priority];
      return priorityDelta || a.index - b.index;
    });

  return candidates[0]?.task ?? null;
}
