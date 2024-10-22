import ListTasks from "@/components/list-tasks";
import { TaskForm } from "@/components/task-form";

export default function Home() {
  return (
    <div className="mx-auto py-4 space-y-3">
      <ListTasks></ListTasks>
      <TaskForm
        title="Name your task:"
        description="Describe your task:"
        date="To do by:"
      ></TaskForm>
    </div>
  );
}
