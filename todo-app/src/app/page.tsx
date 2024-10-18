import  ListTasks from "@/components/list-tasks";
import { Task } from "@/components/task";

export default function Home() {
  return (
    <div className="mx-auto py-4 space-y-3">
      <ListTasks></ListTasks>
      <Task
        title="Name your task:"
        description="Describe your task:"
        date="To do by:"
      ></Task>
    </div>
  );
}
