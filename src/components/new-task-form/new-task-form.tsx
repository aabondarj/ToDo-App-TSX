import { stat } from "fs";
import React, {Component, ReactNode, ChangeEvent, FormEvent} from "react";
import { ReactDOM } from "react"
import './new-task-form.css'
interface TaskFormProps {
  addTask: (text: string) => void
}

export default class NewTaskForm extends Component<TaskFormProps> {

  state = {
    label: ''
  }

  onLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState(({
      label: e.target.value
    }))
  }

  onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.props.addTask(this.state.label)
    this.setState({
      label: ''
    })
  }

  render(): ReactNode {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input 
            className="new-todo" 
            placeholder="What needs to be done?" 
            autoFocus
            onChange={this.onLabelChange}
            value={this.state.label}></input>
        </form>
      </header>
    )
  }

}