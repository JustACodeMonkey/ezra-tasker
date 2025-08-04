import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Switch,
  Textarea,
  useTaskApiContext,
  type Task,
} from '@/shared';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

type TaskViewMode = 'view' | 'edit' | 'create';

type TaskCardProps = {
  task: Task;
  mode?: TaskViewMode;
  onCreateComplete?: () => void;
};

/**
 * The TaskCard component contains the logic to display, edit, and create tasks.
 * @returns
 */
export const TaskCard = ({ task, mode = 'view', onCreateComplete }: TaskCardProps) => {
  const { isSaving, isSavingError, createTask, updateTask, clearErrors } = useTaskApiContext();

  // State for task editing (for larger, more complex forms, I would use zod and react-hook-form)
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskIsCompleted, setTaskIsCompleted] = useState(task.isCompleted);

  const [viewMode, setViewMode] = useState<TaskViewMode>(mode);

  const taskId = task.id ?? 'NEW';
  const idForTitle = `${taskId}-title`;
  const idForDescription = `${taskId}-description`;
  const idForIsCompleted = `${taskId}-completed`;

  const handleToggleIsCompleted = (checked: boolean) =>
    updateTask(taskId, { isCompleted: checked });

  const handleCancel = () => {
    setViewMode('view');
    onCreateComplete?.();
  };

  const handleSave = async () => {
    const updated = {
      title: taskTitle,
      description: taskDescription,
      isCompleted: taskIsCompleted,
    };
    const success =
      viewMode === 'create' ? await createTask(updated) : await updateTask(taskId, updated);

    if (success) {
      onCreateComplete?.();
      setViewMode('view');
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      <Card key={task.id} className="w-full">
        <CardHeader className={viewMode !== 'view' ? 'gap-4' : ''}>
          <CardTitle className={`line-clamp-2 ${viewMode !== 'view' && 'overflow-visible'}`}>
            {viewMode === 'view' ? (
              task.title
            ) : (
              <div className="flex flex-col gap-1">
                <label htmlFor={idForTitle} className="text-muted-foreground">
                  Title
                </label>
                <Input
                  id={idForTitle}
                  value={taskTitle}
                  className="font-normal text-foreground"
                  disabled={isSaving[task.id]}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
              </div>
            )}
          </CardTitle>
          <CardDescription
            className={`text-sm text-muted-foreground whitespace-pre-wrap line-clamp-6 ${viewMode !== 'view' && 'overflow-visible'}`}
          >
            {viewMode === 'view' ? (
              task.description
            ) : (
              <div className="flex flex-col gap-1">
                <label htmlFor={idForTitle} className="text-muted-foreground">
                  Description
                </label>
                <Textarea
                  id={idForDescription}
                  value={taskDescription}
                  className="font-normal text-foreground"
                  disabled={isSaving[task.id]}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex-row justify-between">
          {viewMode === 'view' ? (
            <>
              <Button variant="ghost" size="icon" onClick={() => setViewMode('edit')}>
                <Pencil />
              </Button>
              <div className="flex items-center space-x-2">
                <label htmlFor={idForIsCompleted} className="text-xs text-muted-foreground">
                  Is Completed
                </label>
                <Switch
                  id={idForIsCompleted}
                  checked={task.isCompleted}
                  disabled={isSaving[task.id]}
                  onCheckedChange={handleToggleIsCompleted}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row items-center space-x-2">
                <Button
                  variant="default"
                  disabled={isSaving[task.id] || !taskTitle.trim()}
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button variant="ghost" disabled={isSaving[task.id]} onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor={idForIsCompleted} className="text-xs text-muted-foreground">
                  Is Completed
                </label>
                <Switch
                  id={idForIsCompleted}
                  checked={taskIsCompleted}
                  disabled={isSaving[task.id]}
                  onCheckedChange={(checked) => setTaskIsCompleted(checked)}
                />
              </div>
            </>
          )}
        </CardFooter>
      </Card>
      {isSavingError[task.id] && (
        <div className="absolute inset-0 flex flex-col gap-8 items-center justify-center bg-red-500 bg-opacity-95 z-10">
          <div className="text-white">{isSavingError[task.id]}</div>
          <Button variant="outline" onClick={clearErrors}>
            Ok ... Try again
          </Button>
        </div>
      )}
    </div>
  );
};
