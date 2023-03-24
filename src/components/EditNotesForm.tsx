import React, { useState } from 'react';
import { NoteItem } from './NotesWrapper';

type EditNotesProps = {
  editNote: (arg0: string, id: string) => void;
  task: NoteItem;
  findTags: (value: string) => void;
};

export const EditNotesForm: React.FC<EditNotesProps> = ({ editNote, task, findTags }) => {
  const hashTag = /(^|\s*)(#[a-z_а-і-я\d-]+)/gi;
  const [value, setValue] = useState(task.task);

  const handleSubmit = (evt: React.MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    findTags(value);
    editNote(value.replace(hashTag, ''), task.id);
    setValue('');
  };

  function addData(event: React.ChangeEvent<HTMLInputElement>) {
    const findedTag: RegExpMatchArray | null | string = event.target.value.match(hashTag);
    task.tag = findedTag;
    setValue(event.target.value);
  }
  return (
    <form className="notes-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="notes-input"
        placeholder="Update Note!"
        value={value}
        onChange={addData}
      />
      <button type="submit" className="note-btn">
        Update Note
      </button>
    </form>
  );
};
