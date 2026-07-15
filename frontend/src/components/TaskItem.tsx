import type { Task } from "../types/Task";

import "./TaskItem.css";

type Props = {
  task: Task;
  setTaskToUpdate: any;
  handleDelete: (id: number) => void;
};

export function TaskItem({ task, setTaskToUpdate, handleDelete }: Props) {
  return (
    <article className="task-card">
      <div className="task-card-header">
        <div>
          <h3>{task.title}</h3>
        </div>
        <span className={`status ${task.status}`}>
          {task?.status?.replace("_", " ")}
        </span>
        <span className="functions">
          <button onClick={() => setTaskToUpdate(task)}>e</button>
          <button onClick={() => handleDelete(task.id)}>d</button>
        </span>
      </div>

      <p className="task-description">
        {task.description}
      </p>

      {task.ends_at && (
        <p className="task-date">
          Due: {new Date(task.ends_at).toLocaleString()}
        </p>
      )}
    </article>
  );
}
