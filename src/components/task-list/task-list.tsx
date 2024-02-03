import React, { ReactNode, Component } from 'react'
import './task-list.css'
import Task from "../task";

interface TaskListProps {
  tasks: {description: string, created: string, completed: boolean, id: number}[]
  onDeleted: (id: number) => void
  completedTask: (id: number) => void
}



export default class TaskList extends Component<TaskListProps> {

  render(): ReactNode {

    const {tasks, onDeleted, completedTask}: TaskListProps = this.props

    const elements = tasks.map((item) => {
      const {id, ...itemProps} = item
      return (
        <li key={id}>
          <Task 
            {...itemProps}
            onDeleted = {()=>onDeleted(id)}
            completedTask = {() => completedTask(id)}/>
          <input type="text" className="edit" value="Editing task"></input>
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