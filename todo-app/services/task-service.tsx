import { useState, useEffect } from "react";
import { Task } from "@../../types/task";

const baseUrl = "http://localhost:3001/tasks";

interface UseFetchResult<Task> {
  data: Task | null;
  isPending: boolean;
  error: string | null;
}

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

export const useFetch = <Task,>(
  url: string,
  options?: FetchOptions
): UseFetchResult<Task> => {
  const [data, setData] = useState<Task | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      setError(null);

      try {
        const res = await fetch(url, options);
        if (!res.ok) {
          throw new Error("Failed to fetch the data.");
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, isPending, error };
};

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch(baseUrl);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return await res.json();
};

export const addTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to add task");
  return await res.json();
};

export const updateTask = async (task: Task): Promise<Task> => {
  const res = await fetch(`${baseUrl}/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return await res.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete task");
};
