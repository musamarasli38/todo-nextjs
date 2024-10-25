"use client";

import { ComponentProps, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { addTask } from "@services/task-service";

type TaskProps = ComponentProps<"div"> & {
  onTaskAdded: () => void;
};

export function TaskForm({ onTaskAdded }: TaskProps) {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const handleSave = async () => {
    try {
      const newTask = {
        title: taskTitle,
        description: tasskDescription,
        date: new Date(taskDate),
      };
      await addTask(newTask);
      setTimeout(() => onTaskAdded(), 200);
      setTaskTitle("");
      setTaskDescription("");
      setTaskDate("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };
  return (
    <Card className="px-16 w-full">
      <CardHeader>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2"
          name="title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        ></input>
      </CardHeader>
      <CardContent className=" flex flex-col flex-wrap space-y-3">
        <label htmlFor="description">Description</label>
        <textarea
          className="border border-gray-300 rounded-lg p-2"
          rows={4}
          name="description"
          value={tasskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Enter task description"
        ></textarea>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          className="border border-gray-300 rounded-lg p-2"
          name="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        ></input>
        <button
          onClick={handleSave}
          className="btn-primary bg-primary text-white rounded-lg self-start px-4 py-2"
        >
          Save
        </button>
      </CardContent>
    </Card>
  );
}
