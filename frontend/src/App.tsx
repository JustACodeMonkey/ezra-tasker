import { useState } from 'react';
import './App.css';
import { AppHeader, NewTaskId, TaskCard } from './shared';
import { TasksList } from './views/TasksList';
import { TasksApiContextProvider } from './shared';

const App = () => {
  const [isAddingTask, setIsAddingTask] = useState(false);

  return (
    <TasksApiContextProvider>
      <AppHeader onAddTask={() => setIsAddingTask(true)} />
      <div className="flex flex-col justify-center items-center gap-8 w-full overflow-y-auto p-8">
        <div className="flex flex-col items-center gap-4 w-full">
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
          <TasksList />
        </div>
      </div>
    </TasksApiContextProvider>
  );
};

export default App;
