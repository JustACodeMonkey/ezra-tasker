import { useContext } from 'react';
import { TasksApiContext } from './TasksApiContext';

/**
 * A simple hook to access the Tasks API context.
 * @returns The context values for the Tasks API
 */
export const useTaskApiContext = () => {
  const context = useContext(TasksApiContext);
  if (!context) {
    throw new Error('useTaskApiContext must be used within a TasksApiContextProvider');
  }
  return context;
};
