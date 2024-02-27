/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/state-in-constructor */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import './app.css';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';
import { check } from 'prettier';

interface Props {}

interface Task {
  [key: string]: string | Date | boolean | number, description: string, created: Date, completed: boolean, checked: boolean, id: number
}
interface AppState { todoData: Task[], filter: string }

export default class App extends Component<Props, AppState> {
  maxId = 100;

  state: AppState = {
    todoData: [
      this.createTodoTask('Completed task'),
      this.createTodoTask('Editing task'),
      this.createTodoTask('Active task'),
    ],
    filter: 'all',
  }

  deleteTask = (id: number) => {
    this.setState(({ todoData }: AppState) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newTodoData = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1),
      ]

      return {
        todoData: newTodoData,
      }
    })
  }

  addTask = (text: string) => {
    const newItem = this.createTodoTask(text)

    this.setState(({ todoData }: AppState) => {
      const newTodoData = [
        ...todoData,
        newItem,
      ]

      return {
        todoData: newTodoData,
      }
    })
  }

  editDescription = (text: string, id: number) => {
    this.setState(({todoData}: AppState)=>{
      const idx = todoData.findIndex((el) => el.id === id)
      const oldTask = todoData[idx]
      const newTask = {...oldTask, description: text}

      const newTodoData = [
        ...todoData.slice(0, idx),
        newTask,
        ...todoData.slice(idx + 1),
      ]
      
      return {
        todoData: newTodoData
      }
    })
  }

  completedTask = (id: number) => {

    this.setState(( { todoData }: AppState ) => {
    
      return {
        todoData: this.toogleProperty(todoData, id, 'completed')
      }
    })

    this.setState(( { todoData }: AppState ) => {
    
      return {
        todoData: this.toogleProperty(todoData, id, 'checked')
      }
    })
  }

  getFilteredTasks = (tasks: Task[], filter: string): Task[] => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed)
      case 'completed':
        return tasks.filter(task => task.completed)
      default:
        return tasks
    }
  }

  changeFilter = (filter: string) => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    const {todoData} = this.state
    const newTodoData = todoData.filter(task => !task.completed)

    this.setState({todoData: newTodoData})
  }

  toogleProperty(arr: Task[], id: number, propName: string): Task[] {
    const idx = arr.findIndex((el) => el.id === id)

    const oldTask = arr[idx]
    const newTask = { ...oldTask, [propName]: !oldTask[propName] }

    return [
      ...arr.slice(0, idx),
      newTask,
      ...arr.slice(idx + 1),
    ]
  }

  createTodoTask(description:string) { 
    return { 
      description,
      created: new Date(),
      completed: false,
      editing: false,
      checked: false,
      id: this.maxId++ 
    } 
  }


  render(): React.ReactNode {
    const {todoData, filter} = this.state
    const filteredTasks = this.getFilteredTasks(todoData, filter)
    const todoCount = todoData.length - todoData.filter((el) => el.completed === true).length

    return (
      <React.StrictMode>
        <NewTaskForm addTask={this.addTask}/>
        <section className="main">
        <TaskList 
          tasks = {filteredTasks}
          onDeleted = {this.deleteTask}
          completedTask = {this.completedTask}
          editDescription = {this.editDescription}/>
        <Footer 
        todoCount = {todoCount}
        filter = {filter}
        onFilterChange = {this.changeFilter}
        onClearCompleted = {this.clearCompleted}/>
        </section>
      </React.StrictMode>
    )
  }
}

