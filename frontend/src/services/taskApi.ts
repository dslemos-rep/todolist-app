import type { TaskData } from "../types/Task";

const API_URL = "http://localhost:5500/api/v1";

export const getTasks = async () => {
  const res = await fetch(API_URL + "/tasks");
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

export const getTask = async (id: number) => {
  const res = await fetch(API_URL + "/tasks/" + id);
  if (!res.ok) throw new Error("Failed to fetch task: " + id);
  return res.json();
};

export const createTask = async (task: TaskData) => {
  console.log(task);
  const res = await fetch(API_URL + "/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...task,
      ends_at: task.ends_at ? new Date(task.ends_at).toISOString() : null,
    }),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
  return res.json();
};

export const updateTask = async (task: TaskData) => {
  const res = await fetch(API_URL + "/tasks/" + task.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...task,
      ends_at: task.ends_at ? new Date(task.ends_at).toISOString() : null,
    }),
  });
  if (!res.ok) throw new Error(`Failed to update task: ${task.id}`);
  return res.json();
};

export const deleteTask = async (id: number) => {
  const res = await fetch(API_URL + "/tasks/" + id, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("Failed to delete task: " + id);
  }
};
