"use client";

import { useState } from "react";
import { addTask } from "@services/task-service";
import { ComponentProps } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

import { Task } from "../../types/task";

type TaskFormProps = ComponentProps<"div"> & {
  onTaskAdded: () => void;
  task?: Task;
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
    <Card className="w-full p-6 bg-gray-50 rounded-lg shadow-lg">
      <form id="task-form" className="space-y-4">
        <CardHeader className="space-y-2">
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium">
              Due Date
            </label>
            <input
              type="date"
              id="date"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:ring focus:ring-blue-300"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 focus:ring focus:ring-gray-300"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
