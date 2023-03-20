import React, { useState } from 'react';
import { NotesForm } from './NotesForm';
import { Notes } from './Notes';

import { v4 as uuidv4 } from 'uuid';
import { EditNotesForm } from './EditNotesForm';
uuidv4();

export const NotesWrapper = () => {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes([...notes, { id: uuidv4(), task: note, completed: false, isEditing: false }]);
  };

  const toggleComplete = (id) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, completed: !note.completed } : note)),
    );
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, isEditing: !note.isEditing } : note)),
    );
  };

  const editTask = (task, id) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, task, isEditing: !note.isEditing } : note)),
    );
  };

  return (
    <div className="notes-wrapper">
      <h1>Your Notes!</h1>
      <NotesForm addNote={addNote} />
      {notes.map((note, index) =>
        note.isEditing ? (
          <EditNotesForm editNote={editTask} task={note} />
        ) : (
          <Notes
            task={note}
            key={index}
            toggleComplete={toggleComplete}
            deleteNote={deleteNote}
            editNote={editNote}
          />
        ),
      )}
    </div>
  );
};
