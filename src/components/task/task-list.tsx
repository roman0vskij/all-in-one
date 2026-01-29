"use client";

import { useTaskStore } from "@/entities/task/store";
import { TaskItem } from "./task-item";
import { useShallow } from "zustand/shallow";
import { useHasHydrated } from "@/utils/hooks/useHasHydrated";
import { useCallback, useEffect, useRef } from "react";
import { fetchTasksAction } from "@/actions/task-actions";

export function TaskList() {
  const isHydrated = useHasHydrated();

  const { tasks, filter, page, hasMore, isLoading, addTasks, setLoading } =
    useTaskStore(
      useShallow((s) => ({
        tasks: s.tasks,
        filter: s.filter,
        page: s.page,
        hasMore: s.hasMore,
        isLoading: s.isLoading,
        addTasks: s.addTasks,
        setLoading: s.setLoading,
      })),
    );

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setLoading(true);
    try {
      const result = await fetchTasksAction(page, 10, filter);
      addTasks(result.tasks, result.hasMore);
    } finally {
      setLoading(false);
    }
  }, [page, isLoading, hasMore, addTasks, setLoading, filter]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, loadMore],
  );

  useEffect(() => {
    // Если мы только зашли или сбросили стор, и задач нет — грузим первую порцию
    if (tasks.length === 0 && hasMore && !isLoading) {
      loadMore();
    }
  }, [tasks.length, hasMore, isLoading, loadMore]);

  if (!isHydrated) return "Loading...";

  return (
    <>
      <ul className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>

      <div
        ref={lastElementRef}
        className="h-10 flex items-center justify-center"
      >
        {isLoading && <span>⏳ Loading more tasks...</span>}
        {!hasMore && tasks.length > 0 && <span>✅ All tasks loaded</span>}
      </div>
    </>
  );
}
