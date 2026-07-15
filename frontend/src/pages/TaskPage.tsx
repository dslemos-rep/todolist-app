import { useState, useEffect } from "react";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";

import { getTasks, createTask, updateTask, deleteTask } from "../services/taskApi.js";

import "./TaskPage.css";
import type { Task, TaskData } from "@/types/Task";

export function TaskPage() {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!taskToUpdate) return;
    setIsTaskFormOpen(true);
  }, [taskToUpdate]);

  async function handleCreate(task: TaskData) {
    if (!task) return;
    await createTask(task);
    await loadTasks();
  }
  async function handleUpdate(task: TaskData) {
    setIsTaskFormOpen(true);
    // await setUpdatingTask(task);
    await updateTask(task)
    await loadTasks();
  }
  async function handleDelete(id: number) {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;
    const answer = window.confirm("Delete: " + task.title + "?")
    if (!answer) return;
    await deleteTask(task.id)
    await loadTasks();
  }
  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data.tasks);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main className="task-page">
      <header className="page-header">
        <h1>Task Manager</h1>
        <p>Organize your work and keep track of tasks.</p>
      </header>
      <TaskForm handleCreate={handleCreate} handleUpdate={handleUpdate} taskToUpdate={taskToUpdate} isTaskFormOpen={isTaskFormOpen} setIsTaskFormOpen={setIsTaskFormOpen} />

      <section className="tasks-section">
        <h2>Your Tasks</h2>

        <TaskList tasks={tasks} loading={loading} error={error} setTaskToUpdate={setTaskToUpdate} handleDelete={handleDelete} />
      </section>
    </main>
  );
}
