import React, { useState } from 'react';
import { NoteItem } from './NotesWrapper';

type EditNotesProps = {
  editNote: void;
  task: NoteItem;
  findTags: void;
};

export const EditNotesForm: React.FC<EditNotesProps> = ({ editNote, task, findTags }) => {
  const hashTag = /(^|\s*)(#[a-z_а-і-я\d-]+)/gi;
  const [value, setValue] = useState(task.task);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    findTags(value);
    editNote(value.replace(hashTag, ''), task.id);
    setValue('');
  };
  return (
    <form className="notes-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="notes-input"
        placeholder="Update Note!"
        value={value}
        onChange={(e) => setValue(e.target.value, (task.tag = e.target.value.match(hashTag)))}
      />
      <button type="submit" className="note-btn">
        Update Note
      </button>
    </form>
  );
};
