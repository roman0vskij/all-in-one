"use client";

import { TASK_STATUSES } from "@/constants/task-statuses";
import { useTaskStore } from "@/entities/task/store";

export default function Filter() {
  const filter = useTaskStore((s) => s.filter);
  const setFilter = useTaskStore((s) => s.setFilter);
  console.log("render filter");

  return (
    <div className="flex flex-col gap-5 border">
      <div>{filter}</div>
      <div className="flex gap-4">
        <div
          className="cursor-pointer"
          key={"All"}
          onClick={() => setFilter("All")}
        >
          All
        </div>
        <div
          className="cursor-pointer"
          key={TASK_STATUSES.TODO}
          onClick={() => setFilter("To Do")}
        >
          {TASK_STATUSES.TODO}
        </div>
        <div
          className="cursor-pointer"
          key={TASK_STATUSES.IN_PROGRESS}
          onClick={() => setFilter("In Progress")}
        >
          {TASK_STATUSES.IN_PROGRESS}
        </div>
        <div
          className="cursor-pointer"
          key={TASK_STATUSES.DONE}
          onClick={() => setFilter("Done")}
        >
          {TASK_STATUSES.DONE}
        </div>
      </div>
    </div>
  );
}
