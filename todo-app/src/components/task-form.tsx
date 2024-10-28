"use client";

import { ComponentProps, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import { addTask } from "@services/task-service";

type TaskProps = ComponentProps<"div"> & {
  onTaskAdded: () => void;
};

export function TaskForm({ onTaskAdded }: TaskProps) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const handleSave = async () => {
    try {
      const newTask = {
        title: taskTitle,
        description: taskDescription,
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
    <Accordion type="single" collapsible>
      <AccordionItem value="task-form">
        <AccordionTrigger className="bg-primary text-white p-4 rounded-lg">
          Add New Task
        </AccordionTrigger>
        <AccordionContent>
          <Card className="px-16 w-full mt-4">
            <CardHeader>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg p-2 w-full"
                name="title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </CardHeader>
            <CardContent className="flex flex-col flex-wrap space-y-3">
              <label htmlFor="description">Description</label>
              <textarea
                className="border border-gray-300 rounded-lg p-2 w-full"
                rows={4}
                name="description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter task description"
              />
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="border border-gray-300 rounded-lg p-2 w-full"
                name="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
              />
              <button
                onClick={handleSave}
                className="btn-primary bg-primary text-white rounded-lg self-start px-4 py-2 mt-2"
              >
                Save
              </button>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
