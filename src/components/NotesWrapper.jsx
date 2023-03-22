import React, { useState } from 'react';
import { NotesForm } from './NotesForm';
import { Notes } from './Notes';
import Data from '../data.json';

import { v4 as uuidv4 } from 'uuid';
import { EditNotesForm } from './EditNotesForm';
uuidv4();

export const NotesWrapper = () => {
  const [notes, setNotes] = useState(Data);
  const [hashTags, setHashTags] = useState([notes.tag]);

  const addNote = (note) => {
    setNotes([
      ...notes,
      {
        id: uuidv4(),
        task: note.replace(hashTag, ''),
        completed: false,
        isEditing: false,
        tag: note.match(hashTag),
      },
    ]);
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

  const findTags = (value) => {
    if (value.match(hashTag)) {
      setHashTags(value.match(hashTag));
    }
    return null;
  };

  function deleteTag(id) {
    const deletedTags = notes.map((note) => {
      if (id === note.id) {
        return { ...note, tag: null };
      }
      return note;
    });
    setNotes(deletedTags);
  }

  console.log(notes.filter((notess) => notess.tag !== '#good'));

  const hashTag = /(^|\s*)(#[a-z_а-і-я\d-]+)/gi;

  return (
    <div className="all-notes">
      <div className="notes-wrapper">
        <h1>Your Notes!</h1>
        <NotesForm addNote={addNote} findTags={findTags} />
        {notes.map((note, index) =>
          note.isEditing ? (
            <EditNotesForm editNote={editTask} findTags={findTags} task={note} tag={note.tag} />
          ) : (
            <Notes
              task={note}
              key={index}
              toggleComplete={toggleComplete}
              deleteNote={deleteNote}
              deleteTag={deleteTag}
              editNote={editNote}
              hashTags={hashTags}
              tag={note.tag}
            />
          ),
        )}
      </div>
      <div className="tags-popup">
        <div className="tags-popup__content">
          {
            <div>
              <button className="tag" onClick={() => setNotes(...notes)}>
                All
              </button>
              <ul className="tags-popup__list">
                {notes.map((note, i) => (
                  <li className="tag" key={i} onClick={() => console.log(note.tag)}>
                    {note.tag}
                  </li>
                ))}
              </ul>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
