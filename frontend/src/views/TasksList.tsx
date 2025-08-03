import { TaskCard, useTaskApiContext } from '@/shared';
import { useEffect } from 'react';

/**
 * This component fetches and displays a list of tasks using the TaskCard component.
 * @returns The TasksList component fetches and displays a list of tasks using the TaskCard component.
 */
export const TasksList = () => {
  const { tasks, fetchTasks } = useTaskApiContext();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return tasks.map(task => <TaskCard key={task.id} task={task} />);
};
