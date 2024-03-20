/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */

// task.tsx
// task.tsx
import React from 'react';
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
  elapsedTime: number;
  timerId: number,
  startTime: number,
  onStartTimer: () => void;
  onStopTimer: () => void;
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
  elapsedTime,
  timerId,
  startTime,
  onStartTimer,
  onStopTimer,
}) => {
  let classNames = 'description';
  if (completed) {
    classNames += ' completed';
  }
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCompletedTask = () => {
    completedTask()
    if (completed) {
      onStartTimer()
    } else (
      onStopTimer()
    )
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          // editDescription(editText);
          onEditClass();
        }
      };

  return (
    <>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={handleCompletedTask} checked={checked} ></input>
        <div className='label'>
          <span className={classNames} onClick={handleCompletedTask}>
            {description}
          </span>
          <div className="timer">
            <button className="start-button icon-play" onClick={onStartTimer}></button>
            <button className="start-button icon-pause" onClick={onStopTimer}></button>
            <span>{formatTime(elapsedTime)}</span>
          </div>
          <span className="created">{formatDistanceToNow(created, { includeSeconds: true })}</span>
        </div>
        <button className="icon icon-edit" onClick={onEditClass} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <input type="text" className="edit" value={description} onChange={e => editDescription(e.target.value)} onKeyDown={onKeyDown}></input>
    </>
  );
};

export default Task;



// import React, { useState, useEffect, useRef } from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import './task.css';

// interface TaskProps {
//   description: string;
//   created: Date;
//   completed: boolean;
//   checked: boolean;
//   onDeleted: () => void;
//   completedTask: () => void;
//   onEditClass: () => void;
//   editDescription: (text: string) => void;
// }

// const Task: React.FC<TaskProps> = ({
//   description,
//   created,
//   completed,
//   checked,
//   onDeleted,
//   completedTask,
//   onEditClass,
//   editDescription,
// }) => {
//   const [editText, setEditText] = useState<string>(description);
//   const [startTime, setStartTime] = useState<number | null>(null);
//   const [timerIntervalId, setTimerIntervalId] = useState<NodeJS.Timeout | null>(null);
//   const [elapsedTime, setElapsedTime] = useState<number>(0);
//   const startTimeRef  = useRef<number>(0);
//   const elapsedTimeRef = useRef<number>(0);


//   const formatTime = (seconds: number): string => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   useEffect(() => {
//     // Останавливаем таймер при завершении компонента
//     return () => {
//       if (timerIntervalId) {
//         clearInterval(timerIntervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!completed && startTimeRef.current === null) {
//       // Запуск таймера при загрузке компонента или при изменении состояния completed
//       startTimeRef.current = Date.now() - elapsedTimeRef.current * 1000;
//       const intervalId = setInterval(() => {
//         elapsedTimeRef.current += 1;
//       }, 1000);
//       setTimerIntervalId(intervalId);
//     } else if (completed && startTimeRef.current !== null) {
//       // Остановка таймера при завершении задачи
//       clearInterval(timerIntervalId!);
//       setTimerIntervalId(null);
//       elapsedTimeRef.current = 0;
//       startTimeRef.current = 0;
//     }
//   }, [completed, timerIntervalId]);
  


//   const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEditText(e.target.value);
//   };
  

//   const startTimer = () => {
//     setStartTime(Date.now());
//     const intervalId = setInterval(() => {
//       setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
//     }, 1000);
//     setTimerIntervalId(intervalId);
//   };

//   const stopTimer = () => {
//     if (timerIntervalId) {
//       clearInterval(timerIntervalId);
//     }
//     setTimerIntervalId(null);
//   };

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     editDescription(editText);
//     onEditClass();
//   };

//   const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault(); // Предотвращаем стандартное поведение, чтобы избежать повторной отправки формы
//       editDescription(editText);
//       onEditClass();
//     }
//   };

//   const handleCompletedTask = () => {
//     completedTask(); // Переключаем состояние задачи
//     if (completed) {
//       startTimer(); // Если задача стала незавершенной, запускаем таймер
//     } else {
//       stopTimer(); // Если задача завершена, останавливаем таймер
//     }
//   };

//   let classNames = 'description';
//   if (completed) {
//     classNames += ' completed';
//   }


//   return (
//     <>
//       <div className="view">
//         <input className="toggle" type="checkbox" onClick={handleCompletedTask} checked={checked} />
//         <label>
//           <span className={classNames} onClick={handleCompletedTask}>
//             {description}
//           </span>
//           <span className="created">{formatDistanceToNow(created, { includeSeconds: true })}</span>
//         </label>
//         <button className="icon icon-edit" onClick={onEditClass} />
//         <button className="icon icon-destroy" onClick={onDeleted} />
//       </div>
//       <form className="form-edit" onSubmit={onSubmit}>
//         <input type="text" className="edit" value={editText} onChange={handleEditChange} 
//         onKeyDown={onKeyDown}/>
//         {(
//           <div className="timer">
//             <span>{formatTime(elapsedTime)}</span>
//             <button className="start-button" onClick={startTimer} disabled={!!timerIntervalId}>
//               Start
//             </button>
//             <button className="stop-button" onClick={stopTimer} disabled={!timerIntervalId}>
//               Stop
//             </button>
//           </div>
//         )}
//       </form>
//     </>
//   );
// };

// export default Task;


// import React, { useState, useEffect  } from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import './task.css';

// interface TaskProps {
//   description: string;
//   created: Date;
//   completed: boolean;
//   checked: boolean;
//   onDeleted: () => void;
//   completedTask: () => void;
//   onEditClass: () => void;
//   editDescription: (text: string) => void;
// }

// const Task: React.FC<TaskProps> = ({
//   description,
//   created,
//   completed,
//   checked,
//   onDeleted,
//   completedTask,
//   onEditClass,
//   editDescription,
// }) => {
//   const [editText, setEditText] = useState<string>(description);
//   const [startTime, setStartTime] = useState<number | null>(null);
//   const [timerIntervalId, setTimerIntervalId] = useState<number | null>(null);
//   const [elapsedTime, setElapsedTime] = useState<number>(0);

//   const formatTime = (seconds: number): string => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEditText(e.target.value);
//   };

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     editDescription(editText);
//     onEditClass();
//     if (!completed) {
//       const newStartTime = setStartTime(Date.now());
//       console.log('New Start Time:', newStartTime);
//       const intervalId: number = setInterval(() => {
//         setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
//       }, 1000) as unknown as number;
//       console.log('New Interval ID:', intervalId);
//       setTimerIntervalId(intervalId); // Здесь присваиваем числовое значение идентификатора таймера
//     }
//   };

//   let classNames = 'description';
//   if (completed) {
//     classNames += ' completed';
//   }

//   return (
//     <>
//       <div className="view">
//         <input className="toggle" type="checkbox" onClick={completedTask} checked={checked} />
//         <label>
//           <span className={classNames} onClick={completedTask}>
//             {description}
//           </span>
//           <span className="created">{formatDistanceToNow(created, { includeSeconds: true })}</span>
//         </label>
//         <button className="icon icon-edit" onClick={onEditClass} />
//         <button className="icon icon-destroy" onClick={onDeleted} />
//       </div>
//       <form className="form-edit" onSubmit={onSubmit}>
//         <input type="text" className="edit" value={editText} onChange={handleEditChange} />
//         {startTime !== null && (
//         <div className="timer">
//           <span>{formatTime(elapsedTime)}</span>
//           <button className="start-button" onClick={() => setStartTime(Date.now())}>
//             Start
//           </button>
//           <button className="stop-button" onClick={() => {
//             if (timerIntervalId !== null) {
//               clearInterval(timerIntervalId);
//             }
//           }}>
//             Stop
//           </button>
//         </div>
//       )}
//       </form>
//     </>
//   );
// };

// export default Task;