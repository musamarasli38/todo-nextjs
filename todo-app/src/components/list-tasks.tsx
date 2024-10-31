"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Task } from "../../types/task";
import { fetchTasks, deleteTask, updateTask } from "@services/task-service"; // import deleteTask and updateTask
import { TaskForm } from "./task-form";
import { Calendar, Trash2, Edit } from "lucide-react";
import { Button } from "./ui/button";

export default function ListTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    setIsPending(true);
    setError(null);

    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Handler to delete a task
  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      loadTasks(); // Refresh the list after deletion
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  // Handler to update a task
  const handleUpdate = async (task: Task) => {
    try {
      const updatedTask = { ...task, title: "Updated Title" }; // Add your update logic here
      await updateTask(updatedTask);
      loadTasks(); // Refresh the list after updating
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  return (
    <div className="flex flex-col px-4 gap-4">
      <div>
        <h1 className="text-3xl text-center pb-10">Your To-do List</h1>
      </div>
      <TaskForm onTaskAdded={loadTasks} />

      <div>
        <h2>Tasks:</h2>
        <div className="flex flex-col gap-4">
          {isPending ? (
            <p>Loading tasks...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="flex flex-wrap justify-evenly p-4">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <Card
                    key={task.id}
                    className="bg-black text-white flex flex-row p-2 items-center"
                  >
                    <CardHeader>
                      <h3 className="text-xl font-bold">{task.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <Calendar className="inline mr-2" />
                        {new Date(task.date).toLocaleDateString()}
                      </p>
                      <p>Description: {task.description}</p>
                    </CardContent>
                    <div className="flex gap-2">
                      {/* Update Button */}
                      <Button
                        variant="ghost"
                        onClick={() => handleUpdate(task)}
                      >
                        <Edit className="text-blue-500" />
                      </Button>
                      {/* Delete Button */}
                      <Button
                        variant="ghost"
                        onClick={() => handleDelete(task.id)}
                      >
                        <Trash2 className="text-red-500" />
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <p>No tasks found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
