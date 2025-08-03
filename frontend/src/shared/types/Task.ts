export type Task = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskCreateUpdate = {
  title?: string;
  description?: string;
  isCompleted?: boolean;
};
