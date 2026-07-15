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

//Apenas campos editáveis pelo usuário
export type TaskData = Omit<Task, 'id' | 'created_at' | 'updated_at'> & {
  id: number | null;
};
