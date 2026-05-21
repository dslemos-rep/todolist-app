import { useState } from 'react'
import { createTask } from '../services/taskApi';
import type { CreateTaskData, TaskStatus } from '../types/Task';
import "./TaskForm.css";

type TaskForm = {
  title: string;
  description: string;
  status: TaskStatus;
  ends_at: string;
}

export function TaskForm() {
  const [task, setTask] = useState<CreateTaskData>({ title: "", description: "", status: "todo", ends_at: null })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setTask((prev) => ({
      ...prev, [name]: value,
    }));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await createTask(task);
    setTask({ title: "", description: "", status: "todo", ends_at: "" });
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h1>Create Task</h1>

      <div className="form-group">
        <label htmlFor="title">Title</label>

        <input
          id="title"
          type="text"
          name="title"
          placeholder="Finish React project"
          value={task.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          name="description"
          placeholder="Add API integration and styling"
          value={task.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status">Status</label>

          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ends_at">Due date</label>

          <input
            id="ends_at"
            type="datetime-local"
            name="ends_at"
            value={task.ends_at ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit">
        Create Task
      </button>
    </form>
  );
}

