/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable class-methods-use-this */
// import React, { ReactNode, Component } from 'react'

// task-list.tsx
import React from 'react';
import './task-list.css';
import Task from '../task';

interface TaskItem {
  description: string;
  created: Date;
  completed: boolean;
  checked: boolean;
  id: number;
  elapsedTime: number;
  timerId: number;
  startTime: number;
}

interface TaskListProps {
  tasks: TaskItem[];
  onDeleted: (id: number) => void;
  completedTask: (id: number) => void;
  editDescription: (text: string, id: number) => void;
  onStartTimer: (id: number) => void;
  onStopTimer: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDeleted,
  completedTask,
  editDescription,
  onStartTimer,
  onStopTimer,
}: TaskListProps) => {
  const onEditClass = (id: number) => {
    const liElement = document.getElementById(`task-${id}`);
    if (liElement) {
      liElement.classList.toggle('editing');
    }
  };

  const elements = tasks.map(item => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} id={`task-${id}`}>
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          completedTask={() => completedTask(id)}
          onEditClass={() => onEditClass(id)}
          editDescription={(text: string) => editDescription(text, id)}
          onStartTimer={() => onStartTimer(id)}
          onStopTimer={() => onStopTimer(id)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;


// import React, { useEffect, useState } from 'react';
// import './task-list.css';
// import Task from '../task';

// interface TaskItem {
//   description: string;
//   created: Date;
//   completed: boolean;
//   checked: boolean;
//   id: number;
//   elapsedTime: string
// }

// interface TaskListProps {
//   tasks: TaskItem[];
//   onDeleted: (id: number) => void;
//   completedTask: (id: number) => void;
//   editDescription: (text: string, id: number) => void;
//   onStartTimer: (id: number) => void;
//   onStopTimer: (id: number) => void;
// }

// const TaskList: React.FC<TaskListProps> = ({
//   tasks,
//   onDeleted,
//   completedTask,
//   editDescription,
//   onStartTimer,
//   onStopTimer,
// }: TaskListProps) => {
//   const onEditClass = (id: number) => {
//     const liElement = document.getElementById(`task-${id}`);
//     if (liElement) {
//       liElement.classList.toggle('editing');
//     }
//   };

//   const elements = tasks.map((item) => {
//     const { id, ...itemProps } = item;

//     return (
//       <li key={id} id={`task-${id}`}>
//         <Task
//           {...itemProps}
//           onDeleted={() => onDeleted(id)}
//           completedTask={() => completedTask(id)}
//           onEditClass={() => onEditClass(id)}
//           editDescription={(text: string) => editDescription(text, id)}
//           onStartTimer={() => onStartTimer(id)}
//         onStopTimer={() => onStopTimer(id)}
//         />
//       </li>
//     );
//   });

//   return <ul className="todo-list">{elements}</ul>;
// };

// export default TaskList;