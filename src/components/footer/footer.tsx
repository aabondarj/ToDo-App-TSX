/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prefer-stateless-function */

import React from "react"
import './footer.css'
import TaskFilter from '../tasks-filter'

type FooterProps = {
  todoCount: number
  filter: string
  onFilterChange: (filter: string) => void
  onClearCompleted: () => void
}

const Footer: React.FC<FooterProps> = ({ todoCount, onClearCompleted, ...filters }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TaskFilter {...filters}/>
      <button 
        type="button"
        className="clear-completed"
        onClick={() => onClearCompleted()}
      >
        Clear completed
      </button>
    </footer>
  )
}

export default Footer;