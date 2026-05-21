import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";

import "./TaskPage.css";

export function TaskPage() {
  return (
    <main className="task-page">
      <header className="page-header">
        <h1>Task Manager</h1>
        <p>Organize your work and keep track of tasks.</p>
      </header>

      <TaskForm />

      <section className="tasks-section">
        <h2>Your Tasks</h2>

        <TaskList />
      </section>
    </main>
  );
}
