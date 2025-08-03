import { Button } from '../ui';

type AppHeaderProps = {
  onAddTask: () => void;
};

/**
 * The AppHeader contains the app name and a button to add a new task
 * @returns
 */
export const AppHeader = ({ onAddTask }: AppHeaderProps) => {
  return (
    <div className="flex justify-center px-8 py-4 bg-primary text-primary-foreground">
      <div className="flex flex-row justify-between items-center w-full max-w-sm">
        <h1 className="text-4xl font-bold">Ezra Tasker</h1>
        <Button variant="outline" onClick={onAddTask}>
          Add Task
        </Button>
      </div>
    </div>
  );
};
