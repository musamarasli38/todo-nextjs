"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Task } from "../../types/task";
import { fetchTasks } from "@services/task-service";
import { TaskForm } from "./task-form";
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

  return (
    <div className="flex flex-col px-4">
      <div>
        <h1 className="text-3xl text-center">Your To-do List</h1>
      </div>
      <TaskForm onTaskAdded={loadTasks}></TaskForm>
      <div>
      <h2>Tasks:</h2>

        {isPending ? (
          <p>Loading tasks...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="flex flex-wrap justify-evenly p-4 gap-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Card key={task.id} className=" bg-black text-white flex flex-row  items-center">
                  <CardHeader className="">
                    <h3 className="text-xl font-bold">{task.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p>Date: {new Date(task.date).toLocaleDateString()}</p>
                    <p>Description: {task.description}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No tasks found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
