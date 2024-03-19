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

  const createTodoTask = (description: string): Task => {
    const newTask: Task = {
      description,
      created: new Date(),
      completed: false,
      checked: false,
      id: maxId,
      elapsedTime: 0,
      timerId: 0,
      startTime: 0,
    };
    setMaxId(prevId => prevId + 1);
    return newTask;
  };

  const [todoData, setTodoData] = useState<Task[]>([]);

  useEffect(() => {
    setTodoData([createTodoTask('Completed task')]);
  }, []);

  const [filter, setFilter] = useState<string>('all');

  const deleteTask = (id: number) => {
    setTodoData(todoData.filter(task => task.id !== id));
  };

  const addTask = (text: string) => {
    const newItem = createTodoTask(text);
    setTodoData([...todoData, newItem]);
  };

  const editDescription = (text: string, id: number) => {
    const updatedData = todoData.map(task =>
      task.id === id ? { ...task, description: text } : task
    );
    setTodoData(updatedData);
  };


  const startTimer = (id: number) => {
    const intervalId = setInterval(() => {
      setTodoData((prevTasks: Task[]) =>
        prevTasks.map((task) => {
          if (task.id === id) {
            return { ...task, elapsedTime: task.elapsedTime + 1 };
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
  
  const stopTimer = (id: number) => {
    const taskFind = todoData.find(task => task.id === id);
    if (taskFind && taskFind.timerId) {
      clearInterval(taskFind.timerId);
      setTodoData((prevTasks: Task[]) =>
        prevTasks.map((task) => (task.id === id ? { ...task, timerId: 0 } : task))
      );
    }
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


// import React, { useEffect, useState } from 'react';
// import './app.css';
// import NewTaskForm from '../new-task-form';
// import TaskList from '../task-list';
// import Footer from '../footer';

// interface Task {
//   [key: string]: string | Date | boolean | number,
//   description: string,
//   created: Date,
//   completed: boolean,
//   checked: boolean,
//   id: number,
//   elapsedTime: string;
// }

// const App: React.FC = () => {

//   const [maxId, setMaxId] = useState<number>(0);

//   const createTodoTask = (description:string): Task => {
//     const newTask: Task = { 
//       description,
//       created: new Date(),
//       completed: false,
//       checked: false,
//       id: maxId,
//       elapsedTime: '00:00',
//     };
//     setMaxId(prevId => prevId + 1); // Инкрементируем maxId для следующей задачи
//     return newTask;
//   }

//   const [todoData, setTodoData] = useState<Task[]>([])

//   useEffect(() => {
//     setTodoData([...todoData, createTodoTask('Completed task')]);
//   }, []);

//   const [filter, setFilter] = useState<string>('all');
 

//   const deleteTask = (id: number) => {
//     setTodoData(todoData && todoData.filter(task => task.id !== id));
//   }

//   const addTask = (text: string) => {
//     const newItem = createTodoTask(text);
//     if (todoData) {
//       setTodoData([...todoData, newItem]);
//     }
//   }

//   const editDescription = (text: string, id: number) => {
//     if (todoData) {
//       const updatedData = todoData.map(task =>
//         task.id === id ? { ...task, description: text } : task
//       );
//       setTodoData(updatedData);
//     }
//   }

//   const formatTime = (seconds: number): string => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   const completedTask = (id: number) => {

//     if (todoData) {
//       const updatedData = todoData.map(task =>
//         task.id === id ? { ...task, completed: !task.completed, checked: !task.checked } : task
//       );
//       setTodoData(updatedData);
//     }
    
//   }
//   const startTimer = (id: number) => {
//     const timeInSeconds = Math.floor((Date.now()) / 1000); // Получаем текущее время в секундах
//     const formattedTime = formatTime(timeInSeconds); // Форматируем время
//     setTodoData((prevTasks: Task[]) =>
//     prevTasks.map((task) => (task.id === id ? { ...task, elapsedTime: formattedTime } : task))
//   );
//   };

//   const stopTimer = (id: number) => {
//     setTodoData((prevTasks: Task[]) =>
//       prevTasks.map((task) => (task.id === id ? { ...task, elapsedTime: '0' } : task))
//     );
//   };

//   const getFilteredTasks = (tasks: Task[], newFilter: string): Task[] => {
//     switch (newFilter) {
//       case 'active':
//         return tasks.filter(task => !task.completed);
//       case 'completed':
//         return tasks.filter(task => task.completed);
//       default:
//         return tasks;
//     }
//   }

//   const changeFilter = (newFilter: string) => {
//     setFilter(newFilter);
//   }

//   const clearCompleted = () => {
//     if (todoData) {
//       const newTodoData = todoData.filter(task => !task.completed);
//       setTodoData(newTodoData);
//     }
//   }

  
  
//   const filteredTasks = todoData ? getFilteredTasks(todoData, filter) : [];
//   const todoCount = todoData ? todoData.length - todoData.filter(el => el.completed === true).length : 0;

//   return (
//     <React.StrictMode>
//       <NewTaskForm addTask={addTask}/>
//       <section className="main">
//         <TaskList 
//           tasks = {filteredTasks}
//           onDeleted = {deleteTask}
//           completedTask = {completedTask}
//           editDescription = {editDescription}
//           onStartTimer={startTimer}
//           onStopTimer={stopTimer}/>
          
//         <Footer 
//           todoCount = {todoCount}
//           filter = {filter}
//           onFilterChange = {changeFilter}
//           onClearCompleted = {clearCompleted}/>
//       </section>
//     </React.StrictMode>
//   );
// }

// export default App;