"use client";

import { useTaskStore } from "@/entities/task/store";
import { TaskItem } from "./task-item";
import { useShallow } from "zustand/shallow";
import { useHasHydrated } from "@/utils/hooks/useHasHydrated";
import { useEffect } from "react";
import { fetchTasksAction } from "@/actions/task-actions";
import { Task } from "@/entities/task/type";
import { useElementOnScreen } from "@/utils/hooks/useElementOnScreen";

export function TaskList() {
  const isHydrated = useHasHydrated();

  const [loadMoreRef, isVisible] = useElementOnScreen({
    root: null,
    threshold: 1,
  });

  const isLoading = useTaskStore((s) => s.isLoading);

  const addTasks = useTaskStore((s) => s.addTasks);

  const tasks = useTaskStore(
    useShallow((s) =>
      s.filter === "All"
        ? s.tasks
        : s.tasks.filter((task) => task.status === s.filter),
    ),
  );

  useEffect(() => {
    async function fetchTasks() {
      const { tasks, hasMore } = await fetchTasksAction(0);

      addTasks(tasks as Task[], hasMore);
    }

    fetchTasks();
  }, []);

  console.log("render list");

  if (!isHydrated) return "Loading...";

  return (
    <>
      <ul className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
      <div ref={loadMoreRef} className="h-5">
        {isLoading && "Loading..."}
      </div>
    </>
  );
}
