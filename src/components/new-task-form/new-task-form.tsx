/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */

import React, { useState, ChangeEvent, FormEvent } from 'react';
import './new-task-form.css';

interface TaskFormProps {
  addTask: (text: string, elapsedTime: number) => void;
}

const NewTaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [label, setLabel] = useState<string>('');
  const [min, setMin] = useState<number | string>('');
  const [sec, setSec] = useState<number | string>('');


  const onLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const onMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setMin(value);
    } else {
      setMin('');
    }
  };

  const onSecChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setSec(value);
    } else {
      setSec('');
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(min);
    const elapsedTime = (min !== '' ? parseInt(min as string) : 0) * 60 + (sec !== '' ? parseInt(sec as string) : 0);
    addTask(label, elapsedTime);
    addTask(label, elapsedTime);
    setLabel('');
    setMin('')
    setSec('')
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input 
          className="new-todo label" 
          placeholder="What needs to be done?" 
          autoFocus
          onChange={onLabelChange}
          value={label}
          onKeyDown={onKeyDown} 
        />

        <input 
          className="new-todo min" 
          placeholder="Min" 
          onChange={onMinChange}
          value={min}
          onKeyDown={onKeyDown} 
        />

        <input 
          className="new-todo sec" 
          placeholder="Sec" 
          onChange={onSecChange}
          value={sec}
          onKeyDown={onKeyDown} 
        />
      </form>
    </header>
  );
};

export default NewTaskForm;
