import { create, StateCreator } from "zustand";
import { Task } from "./type";
import { type TASK_STATUS, TASK_STATUSES } from "@/constants/task-statuses";

type InitialState = {
  tasks: Task[];
  filter: "All" | TASK_STATUS;
  user: string;
  page: number;
  hasMore: boolean;
  isLoading: boolean;
};

type Actions = {
  add: (task: Omit<Task, "id" | "status">) => void;
  addTasks: (tasks: Task[], hasMore: boolean) => void;
  remove: (id: number) => void;
  toggle: (id: number) => void;
  setFilter: (filter: InitialState["filter"]) => void;
  setUser: (user: string) => void;
  setLoading: (isLoading: boolean) => void;
};

type TaskStore = Actions & InitialState;

const initialState: InitialState = {
  tasks: [],
  filter: "All",
  user: "",
  page: 0,
  hasMore: true,
  isLoading: false,
};

export const taskStore = <StateCreator<TaskStore>>((set) => ({
  ...initialState,
  add: (task) =>
    set((store) => ({
      tasks: [
        ...store.tasks,
        {
          id: Date.now(),
          status: "To Do",
          ...task,
        },
      ],
    })),
  addTasks: (tasks, hasMore) =>
    set((store) => ({
      tasks: [...store.tasks, ...tasks],
      page: store.page + 1,
      hasMore,
    })),
  remove: (id) =>
    set((store) => ({ tasks: store.tasks.filter((task) => task.id !== id) })),
  toggle: (id) =>
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.id === id ? { ...task, status: getNextStatus(task.status) } : task,
      ),
    })),
  setFilter: (filter) => set({ filter }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export const useTaskStore = create<TaskStore>()(
  taskStore,
  // persist(taskStore, {
  //   name: "task-storage",
  //   partialize: (state) => ({
  //     tasks: state.tasks,
  //   }),
  // }),
);

function getNextStatus(status: TASK_STATUS) {
  if (status === TASK_STATUSES.TODO) return TASK_STATUSES.IN_PROGRESS;
  if (status === TASK_STATUSES.IN_PROGRESS) return TASK_STATUSES.DONE;
  return TASK_STATUSES.TODO;
}
