import React, { useEffect, useContext } from "react";
import Note from "./Note";
import AddNote from "./AddNote";
import { NotesContext } from "../Context/NotesContext";

const LOCAL_STORAGE_KEY = "myAppData";

export default function NotesList() {
  const [notes, setNotes] = useContext(NotesContext);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storage) setNotes(storage);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  return (
    <>
      <AddNote />
      <div className="notesList">
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </>
  );
}
