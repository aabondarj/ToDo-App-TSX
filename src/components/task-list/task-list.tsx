/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable class-methods-use-this */
// import React, { ReactNode, Component } from 'react'

import React from 'react';
import './task-list.css';
import Task from '../task';

interface TaskItem {
  description: string;
  created: Date;
  completed: boolean;
  checked: boolean;
  id: number;
}

interface TaskListProps {
  tasks: TaskItem[];
  onDeleted: (id: number) => void;
  completedTask: (id: number) => void;
  editDescription: (text: string, id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDeleted,
  completedTask,
  editDescription,
}: TaskListProps) => {
  const onEditClass = (id: number) => {
    const liElement = document.getElementById(`task-${id}`);
    if (liElement) {
      liElement.classList.toggle('editing');
    }
  };

  const elements = tasks.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} id={`task-${id}`}>
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          completedTask={() => completedTask(id)}
          onEditClass={() => onEditClass(id)}
          editDescription={(text: string) => editDescription(text, id)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;