/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */

import React, { useState, ChangeEvent, FormEvent } from 'react';
import './new-task-form.css';

interface TaskFormProps {
  addTask: (text: string) => void;
}

const NewTaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [label, setLabel] = useState<string>('');

  const onLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(label);
    setLabel('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input 
          className="new-todo" 
          placeholder="What needs to be done?" 
          autoFocus
          onChange={onLabelChange}
          value={label} />
      </form>
    </header>
  );
};

export default NewTaskForm;
