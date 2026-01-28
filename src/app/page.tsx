import Filter from "@/components/filter/filter";
import { TaskForm } from "@/components/task/task-form";
import { TaskList } from "@/components/task/task-list";
import User from "@/components/user/user";

export default function Home() {
  return (
    <div>
      <TaskForm />
      <Filter />
      <User />
      <TaskList />
    </div>
  );
}
