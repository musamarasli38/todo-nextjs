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
    <div className="flex flex-col px-4 gap-4">
      <div>
        <h1 className="text-3xl text-center pb-10">Your To-do List</h1>
      </div>
      <TaskForm onTaskAdded={loadTasks} />

      <div>
        <h2>Tasks:</h2>
        <div className="flex flex-col gap-4">
          {isPending ? (
            <p>Loading tasks...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="flex flex-wrap justify-evenly p-4">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <Accordion key={task.task_id} type="single" collapsible>
                    <AccordionItem value={String(task.task_id)}>
                      <AccordionTrigger>
                        <h3 className="text-xl font-bold">{task.title}</h3>
                      </AccordionTrigger>
                      <AccordionContent>
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
                          <Card className="bg-black text-white flex flex-col p-4">
                            <CardHeader>
                              <h3 className="text-xl font-bold">
                                {task.title}
                              </h3>
                            </CardHeader>
                            <CardContent>
                              <p>
                                <Calendar className="inline mr-2" />
                                {new Date(task.due_date).toLocaleDateString()}
                              </p>
                              <p>{task.description}</p>
                            </CardContent>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                onClick={() => handleEdit(String(task.task_id))}
                              >
                                <Edit className="text-blue-500" />
                              </Button>
                              <Button
                                variant="ghost"
                                onClick={() =>
                                  handleDelete(task.task_id.toString())
                                }
                              >
                                <Trash2 className="text-red-500" />
                              </Button>
                            </div>
                          </Card>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))
              ) : (
                <p>No tasks found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
