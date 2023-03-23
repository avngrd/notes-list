import React, { useState } from 'react';
import { NotesForm } from './NotesForm';
import { Notes } from './Notes';
import Data from '../data.json';

import { v4 as uuidv4 } from 'uuid';
import { EditNotesForm } from './EditNotesForm';
uuidv4();

export interface NoteItem {
  match(hashTag: RegExp): string | null;
  replace(hashTag: RegExp, arg1: string): string;
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
  tag: string | null;
}

export const NotesWrapper: React.FC = () => {
  const [notes, setNotes] = useState(Data);
  const [notesCopy, setNotesCopy] = useState(Data);

  const [hashTags, setHashTags] = useState();
  const addNote = (note: NoteItem) => {
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

  const toggleComplete = (id: string) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, completed: !note.completed } : note)),
    );
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id: string) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, isEditing: !note.isEditing } : note)),
    );
  };

  const editTask = (task: string, id: string) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, task, isEditing: !note.isEditing } : note)),
    );
  };

  const findTags = (value: { match: (arg0: RegExp) => React.SetStateAction<undefined> }) => {
    if (value.match(hashTag)) {
      setHashTags(value.match(hashTag));
    }
    return null;
  };

  function deleteTag(id: string) {
    const deletedTags = notes.map((note) => {
      if (id === note.id) {
        return { ...note, tag: null };
      }
      return note;
    });
    setNotes(deletedTags);
  }

  function filterTag(tag: string) {
    setNotes(notes.filter((notess) => notess.tag === tag));
  }

  function allNotes() {
    setNotes(notesCopy);
  }

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
              <button className="tag-all" onClick={() => allNotes()}>
                All
              </button>
              <ul className="tags-popup__list">
                {notes.map((note, i) => (
                  <li className="tag" key={i} onClick={() => filterTag(note.tag)}>
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
