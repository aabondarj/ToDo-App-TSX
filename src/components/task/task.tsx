import React, { ReactNode, Component } from 'react'
import './task.css'

interface TaskProps {
  description: string
  created: string
  completed: boolean, 
  onDeleted: () => void
  completedTask: () => void
}


export default class Task extends Component<TaskProps> {

  render(): ReactNode {
    const {description, created, onDeleted, completedTask, completed}: TaskProps = this.props;

    let classNames = 'description';
    if (completed) {
      classNames += ' completed'
    }

    return (
      <div className="view">
          <input className="toggle" type="checkbox"></input>
          <label>
            <span 
              className={classNames}
              onClick={completedTask}> {/* вариант решения проблемы - this.onDescriptionClick.bind(this) */}
              {description}
            </span>
            <span className="created">{created}</span>
          </label>
          <button 
            className="icon icon-edit"></button>
          <button 
            className="icon icon-destroy"
            onClick={onDeleted}></button>
      </div>
    )
  }
}