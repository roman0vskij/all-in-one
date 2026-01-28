"use client";

import { useTaskStore } from "@/entities/task/store";
import { Task } from "@/entities/task/type";
import { memo } from "react";

export const TaskItem = memo(function TaskItem({ task }: { task: Task }) {
  const toggle = useTaskStore((s) => s.toggle);
  const remove = useTaskStore((s) => s.remove);

  console.log("render ", task.id);

  return (
    <li className="flex flex-col gap-1 w-50">
      <div className="font-semibold">
        {task.id}: {task.title}
      </div>
      <div
        onClick={() => {
          toggle(task.id);
        }}
        className="text-emerald-400 border text-center"
      >
        {task.status}
      </div>
      <div>{task.description}</div>
      <button
        onClick={() => remove(task.id)}
        className="w-50 rounded-2xl bg-red-500 cursor-pointer"
      >
        X
      </button>
    </li>
  );
});
