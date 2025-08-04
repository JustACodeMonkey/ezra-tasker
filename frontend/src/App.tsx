import { useState } from 'react';
import './App.css';
import { AppFooter, AppHeader } from './shared';
import { TasksList } from './views/TasksList';
import { TasksApiContextProvider } from './shared';

const App = () => {
  const [isAddingTask, setIsAddingTask] = useState(false);

  return (
    <TasksApiContextProvider>
      <div className="flex flex-col min-h-svh">
        <AppHeader onAddTask={() => setIsAddingTask(true)} />
        <TasksList isAddingTask={isAddingTask} setIsAddingTask={setIsAddingTask} />
        <AppFooter />
      </div>
    </TasksApiContextProvider>
  );
};

export default App;
