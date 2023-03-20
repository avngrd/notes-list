import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const Notes = ({ task, toggleComplete, deleteNote, editNote }) => {
  return (
    <div className="note">
      <p onClick={() => toggleComplete(task.id)} className={`${task.completed ? 'completed' : ''}`}>
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editNote(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteNote(task.id)} />
      </div>
    </div>
  );
};
