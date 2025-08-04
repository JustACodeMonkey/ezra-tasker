import { useCallback, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import {
  NewTaskId,
  TasksApiContext,
  type TaskSaving,
  type TaskSavingError,
} from './TasksApiContext';
import type { Task, TaskCreateUpdate } from '@/shared/types';

// NOTE: In a real application, this would be in an environment variable
export const API_URL = 'http://localhost:5289/tasks';

/**
 * This is the provider component to wrap the application and provide access to the tasks API context.
 * @param param0 - The children to render within the context provider
 * @returns
 */
export const TasksApiContextProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Default to true because we will fetch tasks on mount
  const [isLoadingError, setIsLoadingError] = useState('');
  const [isSaving, setIsSaving] = useState<TaskSaving>({});
  const [isSavingError, setIsSavingError] = useState<TaskSavingError>({});

  /**
   * Fetch tasks from the API
   *
   * @returns A promise that resolves to the list of tasks
   * If an error occurs, it sets the loading state and error message accordingly
   */
  const fetchTasks = useCallback(async (): Promise<Task[]> => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        setIsLoading(false);
        setIsLoadingError(`HTTP error! status: ${response.status}`);
        setTasks([]);
        return [];
      }
      const data = await response.json();
      setTasks(data);
      setIsLoading(false);
      // Clear any previous errors
      setIsLoadingError('');
      return data;
    } catch (error) {
      setIsLoading(false);
      setIsLoadingError(
        'Failed to fetch tasks: ' + (error instanceof Error ? error.message : 'Unknown error'),
      );
      setTasks([]);
      return [];
    }
  }, [setTasks]);

  // We'll load the tasks when the provider mounts
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /**
   * Create a new task
   *
   * @param task - The task to create
   * @returns A promise that resolves to true if the task was created successfully, false otherwise
   */
  const createTask = useCallback(
    async (task: TaskCreateUpdate): Promise<boolean> => {
      try {
        setIsSaving({ [NewTaskId]: true });
        setIsSavingError({});
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        });
        if (!response.ok) {
          setIsSaving({});
          setIsSavingError({ [NewTaskId]: `HTTP error! status: ${response.status}` });
          return false;
        }
        const data = await response.json();
        setTasks((prevTasks) => [data, ...prevTasks]);
        setIsSaving({});
        return true;
      } catch (error) {
        setIsSaving({});
        setIsSavingError({
          [NewTaskId]:
            'Failed to create task: ' + (error instanceof Error ? error.message : 'Unknown error'),
        });
        // Optionally, you could re-fetch tasks here to ensure the list is up-to-date
        // await fetchTasks();
        return false;
      }
    },
    [setTasks],
  );

  /**
   * Update an existing task
   *
   * @param id - The ID of the task to update
   * @param task - The updated task data
   * @returns A promise that resolves to true if the task was updated successfully, false otherwise
   */
  const updateTask = useCallback(
    async (id: string, task: TaskCreateUpdate): Promise<boolean> => {
      try {
        setIsSaving({ [id]: true });
        setIsSavingError({});
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        });
        if (!response.ok) {
          setIsSaving({});
          setIsSavingError({ [id]: `HTTP error! status: ${response.status}` });
          return false;
        }
        setTasks((prevTasks) => prevTasks.map((t) => (t.id === id ? { ...t, ...task } : t)));
        setIsSaving({});
        return true;
      } catch (error) {
        console.error('Failed to update task:', error);
        setIsSaving({});
        setIsSavingError({
          [id]:
            'Failed to update task: ' + (error instanceof Error ? error.message : 'Unknown error'),
        });
        // Optionally, you could re-fetch tasks here to ensure the list is up-to-date
        // await fetchTasks();
        return false;
      }
    },
    [setTasks],
  );

  /**
   * Clear any loading or saving errors
   */
  const clearErrors = useCallback(() => {
    setIsLoadingError('');
    setIsSavingError({});
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      isLoading,
      isLoadingError,
      isSaving,
      isSavingError,
      fetchTasks,
      createTask,
      updateTask,
      clearErrors,
    }),
    [
      tasks,
      isLoading,
      isLoadingError,
      isSaving,
      isSavingError,
      fetchTasks,
      createTask,
      updateTask,
      clearErrors,
    ],
  );

  return <TasksApiContext.Provider value={value}>{children}</TasksApiContext.Provider>;
};
