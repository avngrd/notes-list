import React, { useState } from 'react';

export const NotesForm = ({ addNote }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();

    addNote(value);
    setValue('');
  };
  return (
    <form className="notes-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="notes-input"
        placeholder="Add new note!"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="note-btn">
        Add Note
      </button>
    </form>
  );
};
