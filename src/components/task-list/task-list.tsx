/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable class-methods-use-this */
import React, { ReactNode, Component } from 'react'
import './task-list.css'
import Task from "../task";
import { check } from 'prettier';

interface TaskListProps {
  tasks: {description: string, created: Date, completed: boolean, checked: boolean,  id: number}[]
  onDeleted: (id: number) => void
  completedTask: (id: number) => void
  editDescription: (text: string, id: number) => void
}



export default class TaskList extends Component<TaskListProps> {

  onEditClass = (id: number) => {
    const liElement = document.getElementById(`task-${id}`)
    if (liElement) {
      liElement.classList.toggle('editing')
    }
  }

  render(): ReactNode {

    const {tasks, onDeleted, completedTask, editDescription}: TaskListProps = this.props

    const elements = tasks.map((item) => {
      const {id,  ...itemProps} = item

      return (
        <li key={id} id={`task-${id}`}>
          <Task 
            {...itemProps}
            onDeleted = {()=>onDeleted(id)}
            completedTask = {() => completedTask(id)}
            onEditClass = {() => this.onEditClass(id)}
            editDescription = {(text: string) => editDescription(text, id)}/>
        </li>
      )
      
    })
  
    return (
      <ul className="todo-list">
        {elements}
      </ul>
    )
  }
}