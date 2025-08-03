import { createContext } from 'react';
import type { Task, TaskCreateUpdate } from '../../types/Task';

export const NewTaskId = 'NEW_TASK';

export type TaskSaving = { [key: string]: boolean };

export type TaskSavingError = { [key: string]: string };

/**
 * The context values for the Tasks API, including the list of tasks, loading state, and functions to interact with the API.
 */
export type TasksApiContextValues = {
  tasks: Task[];
  isLoading: boolean;
  isLoadingError: string;
  isSaving: TaskSaving;
  isSavingError: TaskSavingError;
  fetchTasks: () => Promise<Task[]>;
  createTask: (task: TaskCreateUpdate) => Promise<boolean>;
  updateTask: (id: string, task: TaskCreateUpdate) => Promise<boolean>;
  clearErrors: () => void;
};

export const TasksApiContext = createContext<TasksApiContextValues | null>(null);
