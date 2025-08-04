import { useTaskApiContext } from '@/shared/contexts';
import { Button } from '../ui';

/**
 * The AppHeader contains the app name and a button to add a new task
 * @returns
 */
export const AppHeader = () => {
  const { setIsAddingTask } = useTaskApiContext();

  return (
    <div className="flex justify-center px-8 py-4 bg-primary text-primary-foreground">
      <div className="flex flex-row justify-between items-center w-full max-w-sm">
        <h1 className="text-4xl font-bold">Tasker</h1>
        <Button variant="secondary" onClick={() => setIsAddingTask(true)}>
          Add Task
        </Button>
      </div>
    </div>
  );
};
