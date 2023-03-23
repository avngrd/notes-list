import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NoteItem } from './NotesWrapper';

type NotesProps = {
  task: NoteItem;
  toggleComplete: (id: string) => void;
  deleteNote: (id: string) => void;
  editNote: (id: string) => void;
  deleteTag: (id: string, tag: string | null) => void;
  tag: string;
};

export const Notes: React.FC<NotesProps> = ({
  task,
  toggleComplete,
  deleteNote,
  editNote,
  deleteTag,
  tag,
}) => {
  return (
    <div className="note">
      <p onClick={() => toggleComplete(task.id)} className={`${task.completed ? 'completed' : ''}`}>
        {task.task}
      </p>
      <span className={tag != null ? 'hashtag' : ''}>
        {tag}
        {tag != null ? (
          <FontAwesomeIcon icon={faTrash} onClick={() => deleteTag(task.id, task.tag)} />
        ) : (
          ''
        )}
      </span>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editNote(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteNote(task.id)} />
      </div>
    </div>
  );
};
