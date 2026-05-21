export type TaskStatus = "todo" | "in_progress" | "done";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;

  ends_at: string | null;

  created_at: string;
  updated_at: string;
};

export type CreateTaskData = {
  title: string;
  description: string;
  status: TaskStatus;

  ends_at: string | null;
};

export type UpdateTaskData = Partial<CreateTaskData>;
