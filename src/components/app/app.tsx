/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/state-in-constructor */
/* eslint-disable class-methods-use-this */

import React, { useEffect, useState } from 'react';
import './app.css';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

interface Task {
  [key: string]: string | Date | boolean | number,
  description: string,
  created: Date,
  completed: boolean,
  checked: boolean,
  id: number
}

const App: React.FC = () => {

  const [maxId, setMaxId] = useState<number>(0);

  const createTodoTask = (description:string): Task => {
    const newTask: Task = { 
      description,
      created: new Date(),
      completed: false,
      checked: false,
      id: maxId
    };
    setMaxId(prevId => prevId + 1); // Инкрементируем maxId для следующей задачи
    return newTask;
  }

  const [todoData, setTodoData] = useState<Task[]>([])

  useEffect(() => {
    setTodoData([...todoData, createTodoTask('Completed task')]);
  }, []);

  const [filter, setFilter] = useState<string>('all');
 

  const deleteTask = (id: number) => {
    setTodoData(todoData && todoData.filter(task => task.id !== id));
  }

  const addTask = (text: string) => {
    const newItem = createTodoTask(text);
    if (todoData) {
      setTodoData([...todoData, newItem]);
    }
  }

  const editDescription = (text: string, id: number) => {
    if (todoData) {
      const updatedData = todoData.map(task =>
        task.id === id ? { ...task, description: text } : task
      );
      setTodoData(updatedData);
    }
  }

  const completedTask = (id: number) => {

    if (todoData) {
      const updatedData = todoData.map(task =>
        task.id === id ? { ...task, completed: !task.completed, checked: !task.checked } : task
      );
      setTodoData(updatedData);
    }
    
  }

  const getFilteredTasks = (tasks: Task[], newFilter: string): Task[] => {
    switch (newFilter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }

  const changeFilter = (newFilter: string) => {
    setFilter(newFilter);
  }

  const clearCompleted = () => {
    if (todoData) {
      const newTodoData = todoData.filter(task => !task.completed);
      setTodoData(newTodoData);
    }
  }

  
  
  const filteredTasks = todoData ? getFilteredTasks(todoData, filter) : [];
  const todoCount = todoData ? todoData.length - todoData.filter(el => el.completed === true).length : 0;

  return (
    <React.StrictMode>
      <NewTaskForm addTask={addTask}/>
      <section className="main">
        <TaskList 
          tasks = {filteredTasks}
          onDeleted = {deleteTask}
          completedTask = {completedTask}
          editDescription = {editDescription}/>
        <Footer 
          todoCount = {todoCount}
          filter = {filter}
          onFilterChange = {changeFilter}
          onClearCompleted = {clearCompleted}/>
      </section>
    </React.StrictMode>
  );
}

export default App;