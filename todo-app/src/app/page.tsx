import ListTasks from "@/components/list-tasks";
import { TaskForm } from "@/components/task-form";
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <TaskForm
        onTaskAdded={function (): void {
          throw new Error("Function not implemented.");
        }}
      ></TaskForm>
      <ListTasks></ListTasks>
    </div>
  );
}
