"use client";

import { ComponentProps, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { addTask } from "@services/task-service";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

type TaskProps = ComponentProps<"div"> & {
  onTaskAdded: () => void;
};

export function TaskForm({ onTaskAdded }: TaskProps) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async () => {
    try {
      const newTask = {
        task_id: 0,
        user_id: 1,
        title: taskTitle,
        description: taskDescription,
        due_date: new Date(taskDate),
        completed: false,
        created_at: new Date(),
        updated_at: new Date(),
      };
      await addTask(newTask);
      onTaskAdded();

      setTaskTitle("");
      setTaskDescription("");
      setTaskDate("");

      setIsOpen(false);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      value={isOpen ? "task-form" : undefined}
      onValueChange={() => setIsOpen(!isOpen)}
    >
      <AccordionItem value="task-form">
        <AccordionTrigger onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close Task Form" : "Add New Task"}
        </AccordionTrigger>
        <AccordionContent className="w-full">
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
            <CardContent className="flex flex-col space-y-3">
              <label htmlFor="description">Description</label>
              <textarea
                className="border border-gray-300 rounded-lg p-2"
                rows={4}
                name="description"
                value={taskDescription}
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
