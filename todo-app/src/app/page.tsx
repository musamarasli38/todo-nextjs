import { Task } from "@/components/task";

export default function Home() {
  return (
    <main className="mx-auto py-4 space-y-3">
      <div>
        <h1 className="text-3xl text-center">Todo App</h1>
      </div>
      <Task
        title="Name your task:"
        description="Describe your task:"
        date="To do by:"
      ></Task>
    </main>
  );
}
