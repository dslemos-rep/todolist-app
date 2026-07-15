import type { Task, TaskData } from "@/types/Task.js";
import { TaskItem } from "./TaskItem.jsx"
import type { Dispatch, SetStateAction } from "react";

type TaskList = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  setTaskToUpdate: Dispatch<SetStateAction<TaskData | null>>;
  handleDelete: (id: number) => Promise<void>;
}

export function TaskList({ tasks, loading, error, setTaskToUpdate, handleDelete }: TaskList) {
  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          setTaskToUpdate={setTaskToUpdate}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
