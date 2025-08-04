import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  NewTaskId,
  TaskCard,
  useTaskApiContext,
} from '@/shared';
import { useEffect, type Dispatch, type SetStateAction } from 'react';

type TaskListProps = {
  isAddingTask: boolean;
  setIsAddingTask: Dispatch<SetStateAction<boolean>>;
};

/**
 * This component fetches and displays a list of tasks using the TaskCard component.
 * @returns The TasksList component fetches and displays a list of tasks using the TaskCard component.
 */
export const TasksList = ({ isAddingTask, setIsAddingTask }: TaskListProps) => {
  const { tasks, isLoading, isLoadingError, fetchTasks } = useTaskApiContext();

  // If there are NO tasks and we're done loading, we should show the add task card
  useEffect(() => {
    if (!isLoading && !isLoadingError && tasks.length === 0) {
      setIsAddingTask(true);
    }
  }, [isLoading, isLoadingError, tasks]);

  return (
    <div className="flex flex-col flex-1 items-center gap-8 w-full overflow-y-auto p-8">
      <div className="flex flex-col items-center gap-4 w-full">
        {/* If there is a loading error, show the error message */}
        {isLoadingError ? (
          <Card className="bg-red-600 w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-white">Error loading tasks</CardTitle>
              <CardDescription className="text-white">{isLoadingError}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                disabled={isLoading}
                onClick={() => fetchTasks()}
                className="w-full"
              >
                {isLoading ? 'Refetching ...' : 'Retry'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {isAddingTask && (
              <TaskCard
                task={{
                  id: NewTaskId,
                  title: '',
                  description: '',
                  isCompleted: false,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                }}
                mode="create"
                onCreateComplete={() => setIsAddingTask(false)}
              />
            )}
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
