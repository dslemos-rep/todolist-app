import type { Task } from "../types/Task";

import "./TaskItem.css";

type Props = {
  task: Task;
};

export function TaskItem({ task }: Props) {
  return (
    <article className="task-card">
      <div className="task-card-header">
        <div>
          <h3>{task.title}</h3>

          <span className={`status ${task.status}`}>
            {task.status.replace("_", " ")}
          </span>
        </div>

        <span className="task-id">
          #{task.id}
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
