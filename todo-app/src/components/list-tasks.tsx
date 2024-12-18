"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { Task } from "../../types/task";
import { fetchTasks, deleteTask, updateTask } from "@services/task-service";
import { TaskForm } from "./task-form";
import { Calendar, Trash2, Edit } from "lucide-react";
import { Button } from "./ui/button";

export default function ListTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    setIsPending(true);
    setError(null);

    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks.data || []);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      loadTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleEdit = (taskId: string) => {
    setEditingTaskId(taskId);
  };

  const handleSave = async (updatedTask: Task) => {
    try {
      await updateTask(updatedTask);
      loadTasks();
      setEditingTaskId(null);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleCancel = () => {
    setEditingTaskId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 pb-6">
        Your To-do List
      </h1>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="create">
          <AccordionTrigger className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium p-4 rounded-t-lg">
            <h3 className="text-xl font-bold">Create Task</h3>
          </AccordionTrigger>
          <AccordionContent className="bg-gray-50 p-4 rounded-b-lg shadow-inner">
            <TaskForm onTaskAdded={loadTasks} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700">Tasks:</h2>
        <div className="flex flex-col gap-6">
          {isPending ? (
            <p className="text-gray-500">Loading tasks...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <Accordion key={task.task_id} type="single" collapsible>
                    <AccordionItem value={String(task.task_id)}>
                      <AccordionTrigger className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium p-4 rounded-t-lg">
                        <h3 className="text-xl font-bold">{task.title}</h3>
                      </AccordionTrigger>
                      <AccordionContent className="bg-gray-50 p-4 rounded-b-lg shadow-inner">
                        {editingTaskId === String(task.task_id) ? (
                          <TaskForm
                            onTaskAdded={loadTasks}
                            task={{
                              ...task,
                              due_date: new Date(task.due_date),
                            }}
                            onSave={handleSave}
                            onCancel={handleCancel}
                          />
                        ) : (
                          <Card className="bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-md rounded-lg p-6 flex flex-col justify-between">
                            <CardHeader>
                              <h3 className="text-2xl font-bold">
                                {task.title}
                              </h3>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">
                                <Calendar className="inline mr-2 text-gray-400" />
                                {new Date(task.due_date).toLocaleDateString()}
                              </p>
                              <p className="mt-2">{task.description}</p>
                            </CardContent>
                            <div className="flex gap-4 mt-4">
                              <Button
                                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-2"
                                onClick={() => handleEdit(String(task.task_id))}
                              >
                                <Edit className="mr-2" />
                                Edit
                              </Button>
                              <Button
                                className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-2"
                                onClick={() =>
                                  handleDelete(task.task_id.toString())
                                }
                              >
                                <Trash2 className="mr-2" />
                                Delete
                              </Button>
                            </div>
                          </Card>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))
              ) : (
                <p className="text-gray-500">No tasks found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
