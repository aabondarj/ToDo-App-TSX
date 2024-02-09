/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react"
import './footer.css'
import TaskFilter from '../tasks-filter'

type FooterProps = {
  todoCount: number
  filter: string
  onFilterChange: (filter: string) => void
  onClearCompleted: () => void
}
export default class Footer extends Component<FooterProps> {
  
  render(): React.ReactNode {
    const { todoCount, onClearCompleted, ...filters } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{ todoCount } items left</span>
        <TaskFilter { ...filters }/>
        <button 
        type="button"
        className="clear-completed"
        onClick={() => onClearCompleted()}>Clear completed</button>
      </footer>
    )
  }
}