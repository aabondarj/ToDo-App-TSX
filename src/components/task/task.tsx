/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */

import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

interface TaskProps {
  description: string;
  created: Date;
  completed: boolean;
  checked: boolean;
  onDeleted: () => void;
  completedTask: () => void;
  onEditClass: () => void;
  editDescription: (text: string) => void;
}

const Task: React.FC<TaskProps> = ({
  description,
  created,
  completed,
  checked,
  onDeleted,
  completedTask,
  onEditClass,
  editDescription,
}) => {
  const [editText, setEditText] = useState<string>(description);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editDescription(editText);
    onEditClass();
  };

  let classNames = 'description';
  if (completed) {
    classNames += ' completed';
  }

  return (
    <>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={completedTask} checked={checked} />
        <label>
          <span className={classNames} onClick={completedTask}>
            {description}
          </span>
          <span className="created">{formatDistanceToNow(created, { includeSeconds: true })}</span>
        </label>
        <button className="icon icon-edit" onClick={onEditClass} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <form className="form-edit" onSubmit={onSubmit}>
        <input type="text" className="edit" value={editText} onChange={handleEditChange} />
      </form>
    </>
  );
};

export default Task;