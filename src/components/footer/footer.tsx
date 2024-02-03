import React, {Component, ReactNode} from "react"
import './footer.css'
import TaskFilter from "../tasks-filter"

interface FooterProps {
  todoCount: number
  filter: string
  onFilterChange: (filter: string) => void
  onClearCompleted: () => void
}
export default class Footer extends Component<FooterProps> {
  
  render(): ReactNode {
    const {todoCount, onClearCompleted, ...filters}: FooterProps = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <TaskFilter {...filters}/>
        <button 
        className="clear-completed"
        onClick={() => onClearCompleted()}>Clear completed</button>
      </footer>
    )
  }
}