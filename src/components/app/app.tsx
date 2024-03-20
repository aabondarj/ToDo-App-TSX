/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/state-in-constructor */
/* eslint-disable class-methods-use-this */

// app.tsx
import React, { useEffect, useState } from 'react';
import './app.css';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

interface Task {
  [key: string]: string | Date | boolean | number | undefined,
  description: string,
  created: Date,
  completed: boolean,
  checked: boolean,
  id: number,
  elapsedTime: number;
  timerId: number;
  startTime: number;
}

const App: React.FC = () => {
  const [maxId, setMaxId] = useState<number>(0);

  const createTodoTask = (description: string, elapsedTime: number): Task => {
    const newTask: Task = {
      description,
      created: new Date(),
      completed: false,
      checked: false,
      id: maxId,
      elapsedTime,
      timerId: 0,
      startTime: 0,
    };
    setMaxId(prevId => prevId + 1);
    return newTask;
  };

  const [todoData, setTodoData] = useState<Task[]>([]);

  useEffect(() => {
    setTodoData([createTodoTask('Completed task', 5)]);
  }, []);

  const [filter, setFilter] = useState<string>('all');

  const deleteTask = (id: number) => {
    setTodoData(todoData.filter(task => task.id !== id));
  };

  const addTask = (text: string, elapsedTime: number) => {
    const newItem = createTodoTask(text, elapsedTime);
    setTodoData([...todoData, newItem]);
  };

  const editDescription = (text: string, id: number) => {
    const updatedData = todoData.map(task =>
      task.id === id ? { ...task, description: text } : task
    );
    setTodoData(updatedData);
  };
  
  const stopTimer = (id: number) => {
    const taskFind = todoData.find(task => task.id === id);
    if (taskFind && taskFind.timerId) {
      clearInterval(taskFind.timerId);
      setTodoData((prevTasks: Task[]) =>
        prevTasks.map((task) => (task.id === id ? { ...task, timerId: 0 } : task))
      );
    }
  };

  const startTimer = (id: number) => {
    const intervalId = setInterval(() => {
      setTodoData((prevTasks: Task[]) =>
        prevTasks.map((task) => {
          if (task.id === id) {
            const completedTime = Math.max(task.elapsedTime - 1, 0);
            if (task.elapsedTime === 0) {
              clearInterval(intervalId);
            }
            return { ...task, elapsedTime: completedTime};
          }
          return task;
        })
      );
    }, 1000);
  
    setTodoData((prevTasks: Task[]) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, timerId: parseInt(intervalId.toString()), startTime: Date.now() };
        }
        return task;
      })
    );

    
  };

  const completedTask = (id: number) => {
    const updatedData = todoData.map(task =>
      { if (task.id === id) {
          return { ...task, completed: !task.completed, checked: !task.checked };
        }
      return task;
      }
    );
    setTodoData(updatedData);
  };

  const getFilteredTasks = (tasks: Task[], newFilter: string): Task[] => {
    switch (newFilter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  const changeFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  const clearCompleted = () => {
    const newTodoData = todoData.filter(task => !task.completed);
    setTodoData(newTodoData);
  };

  const filteredTasks = getFilteredTasks(todoData, filter);
  const todoCount = todoData.length - todoData.filter(el => el.completed).length;

  return (
    <React.StrictMode>
      <NewTaskForm addTask={addTask} />
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onDeleted={deleteTask}
          completedTask={completedTask}
          editDescription={editDescription}
          onStartTimer={startTimer}
          onStopTimer={stopTimer}
        />
        <Footer
          todoCount={todoCount}
          filter={filter}
          onFilterChange={changeFilter}
          onClearCompleted={clearCompleted}
        />
      </section>
    </React.StrictMode>
  );
};

export default App;
