"use client";

import { TASK_STATUS, TASK_STATUSES } from "@/constants/task-statuses";
import { useTaskStore } from "@/entities/task/store";
import { useShallow } from "zustand/shallow";

export default function Filter() {
  const { filter, setFilter } = useTaskStore(
    useShallow((s) => ({
      filter: s.filter,
      setFilter: s.setFilter,
    })),
  );
  console.log("render filter");

  const onclick = (filter: TASK_STATUS | "All") => {
    setFilter(filter);
  };

  return (
    <div className="flex flex-col gap-5 border">
      <div>{filter}</div>
      <div className="flex gap-4">
        <div
          className="cursor-pointer"
          key={"All"}
          onClick={() => onclick("All")}
        >
          All
        </div>
        <div
          className="cursor-pointer"
          key={TASK_STATUSES.TODO}
          onClick={() => onclick("To Do")}
        >
          {TASK_STATUSES.TODO}
        </div>
        <div
          className="cursor-pointer"
          key={TASK_STATUSES.IN_PROGRESS}
          onClick={() => onclick("In Progress")}
        >
          {TASK_STATUSES.IN_PROGRESS}
        </div>
        <div
          className="cursor-pointer"
          key={TASK_STATUSES.DONE}
          onClick={() => onclick("Done")}
        >
          {TASK_STATUSES.DONE}
        </div>
      </div>
    </div>
  );
}
