"use server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createTaskAction(data: any, success: boolean) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Success", data);
  return success
    ? { success: true, error: null }
    : { success: false, error: { message: "error message..." } };
}

export async function fetchTasksAction(page: number, limit: number = 5) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const start = page * limit;
  const tasks = Array.from({ length: limit }).map((_, i) => ({
    id: start + i,
    title: `Task ${start + i}`,
    description: "Generated task",
    status: "To Do",
  }));

  const hasMore = page < 10;

  return { tasks, hasMore };
}
