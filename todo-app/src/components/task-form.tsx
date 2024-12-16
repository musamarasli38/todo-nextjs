"use client";

import { useState } from "react";
import { addTask } from "@services/task-service";
import { ComponentProps } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

import { Task } from "../../types/task";

type TaskFormProps = ComponentProps<"div"> & {
  onTaskAdded: () => void;
  task?: Task; // For editing
  onSave?: (task: Task) => void;
  onCancel?: () => void;
};

export function TaskForm({
  onTaskAdded,
  task,
  onSave,
  onCancel,
}: TaskFormProps): JSX.Element {
  const [taskTitle, setTaskTitle] = useState(task?.title || "");
  const [taskDescription, setTaskDescription] = useState(
    task?.description || ""
  );
  const [taskDate, setTaskDate] = useState(
    task?.due_date ? new Date(task.due_date).toISOString().split("T")[0] : ""
  );

  const handleSave = async () => {
    if (task) {
      if (onSave) {
        const updatedTask: Task = {
          ...task,
          title: taskTitle,
          description: taskDescription,
          due_date: new Date(taskDate),
          updated_at: new Date(),
        };
        onSave(updatedTask);
      }
    } else {
      try {
        const newTask: Omit<Task, "task_id"> = {
          title: taskTitle,
          description: taskDescription,
          due_date: new Date(taskDate),
          completed: false,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        };
        await addTask(newTask);
        onTaskAdded();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  return (
    <Card className="w-full space-x-2 space-y-3">
      <form id="task-form">
        <CardHeader>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </CardHeader>
        <CardContent className="space-y-3 space-x-2">
          <label htmlFor="description">Description</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <label htmlFor="date">Due Date</label>
          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />
          <button className="" onClick={handleSave}>
            Save
          </button>
          <button onClick={onCancel}>Cancel</button>
        </CardContent>
      </form>
    </Card>
  );
}
