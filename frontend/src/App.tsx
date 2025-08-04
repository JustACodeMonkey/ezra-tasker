import './App.css';
import { AppFooter, AppHeader } from './shared';
import { TasksList } from './views/TasksList';
import { TasksApiContextProvider } from './shared';

const App = () => {
  return (
    <TasksApiContextProvider>
      <div className="flex flex-col min-h-svh">
        <AppHeader />
        <TasksList />
        <AppFooter />
      </div>
    </TasksApiContextProvider>
  );
};

export default App;
