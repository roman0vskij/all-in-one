export const TASK_STATUSES = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
} as const;

type TASK_STATUSES = typeof TASK_STATUSES;

export type TASK_STATUS = TASK_STATUSES[keyof TASK_STATUSES];
