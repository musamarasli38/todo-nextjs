"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
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
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");
  const [editedDate, setEditedDate] = useState<Date>(new Date());

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

  const handleEdit = (task: Task) => {
    setEditingTaskId(String(task.task_id));
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedDate(task.due_date);
  };

  const handleSave = async () => {
    if (!editingTaskId) return;
    try {
      const updatedTask: Task = {
        task_id: parseInt(editingTaskId),
        user_id: 1,
        title: editedTitle,
        description: editedDescription,
        updated_at: new Date(),
        created_at: new Date(),
        due_date: editedDate,
        completed: false,
      };
      await updateTask(updatedTask);
      loadTasks();
      handleCancel();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleCancel = () => {
    setEditingTaskId(null);
  };

  const handleToggleComplete = async (taskId: number, completed: boolean) => {
    try {
      await updateTask({ task_id: taskId, completed });
      loadTasks();
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
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
                  <Card
                    key={task.task_id}
                    className={`bg-black text-white flex flex-row p-2 items-center ${
                      task.completed ? "opacity-50" : ""
                    }`}
                  >
                    <CardHeader>
                      <h3 className="text-xl font-bold">{task.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <Calendar className="inline mr-2" />
                        {new Date(task.due_date).toLocaleDateString()}
                      </p>
                      <p>
                        <label>Description:</label>
                        <input
                          type="text"
                          value={
                            Number(editingTaskId) === task.task_id
                              ? editedDescription
                              : task.description
                          }
                          readOnly={Number(editingTaskId) !== task.task_id}
                          className={`${
                            Number(editingTaskId) !== task.task_id
                              ? "pointer-events-none outline-none bg-slate-400 font-bold text-black"
                              : ""
                          }`}
                          onChange={(e) => setEditedDescription(e.target.value)}
                        />
                      </p>
                    </CardContent>
                    <div className="flex gap-2">
                      {Number(editingTaskId) === task.task_id ? (
                        <>
                          <Button variant="ghost" onClick={handleSave}>
                            Save
                          </Button>
                          <Button variant="ghost" onClick={handleCancel}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            onClick={() => handleEdit(task)}
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
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={(e) =>
                              handleToggleComplete(
                                task.task_id,
                                e.target.checked
                              )
                            }
                          />
                          <label>Completed</label>
                        </>
                      )}
                    </div>
                  </Card>
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
