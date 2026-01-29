"use server";

import { Task } from "@/entities/task/type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createTaskAction(data: any, success: boolean) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Success", data);
  return success
    ? { success: true, error: null }
    : { success: false, error: { message: "error message..." } };
}

const MOCK_DB: Task[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  title: `Task ${i + 1}`,
  description: `Description for task ${i + 1}`,
  status: i % 3 === 0 ? "Done" : i % 3 === 1 ? "To Do" : "In Progress",
}));

export async function fetchTasksAction(
  page: number,
  limit: number = 5,
  status: string = "All",
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const filteredData = MOCK_DB.filter((task) =>
    status === "All" ? true : task.status === status,
  );

  const start = (page - 1) * limit;
  const end = start + limit;
  const tasks = filteredData.slice(start, end);

  const hasMore = end < filteredData.length;

  console.log(
    `Server: Returning ${tasks.length} tasks for status "${status}" (page ${page})`,
  );

  return {
    tasks,
    hasMore,
  };
}
