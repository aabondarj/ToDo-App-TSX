/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React, { ReactNode, Component, FormEvent } from 'react'
import { formatDistanceToNow } from 'date-fns';
import './task.css'

interface TaskProps {
  description: string
  created: Date
  completed: boolean,
  onDeleted: () => void
  completedTask: () => void
  onEditClass: () => void
  editDescription: (text: string) => void
}


export default class Task extends Component<TaskProps> {
  
  state = {
    editText: this.props.description
  }

  handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ editText: e.target.value });
  };

  onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.props.editDescription(this.state.editText)
    this.props.onEditClass()
  }

  render(): ReactNode {
    const {description, created, onDeleted, completedTask, completed, onEditClass,}: TaskProps = this.props;

    let classNames = 'description';
    if (completed) {
      classNames += ' completed'
    }

    return (
      <>
        <div className="view">
            <input className="toggle" type="checkbox" onClick={completedTask} />
            <label>
              <span 
                className={classNames}
                onClick={completedTask}>
                {description}
              </span>
              <span className="created">{formatDistanceToNow(created, {includeSeconds: true})}</span>
            </label>
            <button 
              className="icon icon-edit"
              onClick={onEditClass} />
            <button 
              className="icon icon-destroy"
              onClick={onDeleted} />
        </div>
        <form className='form-edit' onSubmit={this.onSubmit} >
          <input type="text" className="edit" value={this.state.editText} onChange={this.handleEditChange} />
        </form>
    </>
    )
  }
}