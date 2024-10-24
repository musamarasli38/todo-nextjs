"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Task } from "../../types/task";
import { fetchTasks } from "@services/task-service";
export default function ListTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        setError("Failed to load tasks");
      } finally {
        setIsPending(false);
      }
    };

    loadTasks();
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-3xl text-center">Your To-do List</h1>
      </div>
      <div>
        <Link href="/task">Add New Task</Link>
        {isPending ? (
          <p>Loading tasks...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <h2>For Tomorrow:</h2>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Card key={task.id} className="space-y-0 my-4">
                  <CardHeader className="p2">
                    <h3 className="text-xl font-bold">{task.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p>Date: {new Date(task.date).toLocaleDateString()}</p>
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
