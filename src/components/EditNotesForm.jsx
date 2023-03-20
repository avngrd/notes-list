import React, { useState } from 'react';

export const EditNotesForm = ({ editNote, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    editNote(value, task.id);
    setValue('');
  };
  return (
    <form className="notes-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="notes-input"
        placeholder="Update Note!"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="note-btn">
        Update Note
      </button>
    </form>
  );
};
