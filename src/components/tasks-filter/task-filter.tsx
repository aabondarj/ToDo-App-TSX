/* eslint-disable react/button-has-type */
/* eslint-disable react/prefer-stateless-function */
import React, {ReactNode, Component} from "react";
import './task-filter.css'

interface FiltersProps {
  filter: string
  onFilterChange: (filter: string) => void
}

export default class TaskFilter extends Component<FiltersProps> {
  render(): ReactNode {
    const {filter, onFilterChange}: FiltersProps = this.props
    return (
      <ul className="filters">
        <li>
          <button 
          className={filter === 'all' ? 'selected' : ''}
          onClick={() => onFilterChange('all')}>All</button>
        </li>
        <li>
          <button 
          className={filter === 'active' ? 'selected' : ''}
          onClick={() => onFilterChange('active')}>Active</button>
        </li>
        <li>
          <button 
          className={filter === 'completed' ? 'selected' : ''}
          onClick={() => onFilterChange('completed')}>Completed</button>
        </li>
      </ul>
    )
  }
}
