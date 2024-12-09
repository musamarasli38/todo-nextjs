import { Task } from "@../../types/task";

const baseUrl = "/api/tasks";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const fetchTasks = async (): Promise<ApiResponse<Task[]>> => {
  try {
    const res = await fetch(baseUrl, { method: "GET" });
    if (!res.ok) throw new Error("Failed to fetch tasks");
    const data = await res.json();
    console.log(data);
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
};

export const addTask = async (
  task: Omit<Task, "id">
): Promise<ApiResponse<Task[]>> => {
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to add task");
    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
};

export const updateTask = async (
  task: Partial<Task>
): Promise<ApiResponse<Task>> => {
  try {
    const res = await fetch(baseUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to update task");
    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
};

export const deleteTask = async (id: string): Promise<ApiResponse<Task[]>> => {
  try {
    const res = await fetch(`${baseUrl}?id=${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete task");
    return { data: null, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
};
