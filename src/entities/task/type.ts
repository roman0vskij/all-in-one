import { TASK_STATUS } from "@/constants/task-statuses";
import { Entity } from "../entity";

export type Task = Entity & {
  title: string;
  description: string;
  status: TASK_STATUS;
};
