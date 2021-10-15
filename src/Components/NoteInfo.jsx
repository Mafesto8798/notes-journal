import React, { useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "../Context/NotesContext";
import { CurrentNote } from "../Context/CurrentNote";
import { useParams, Link, Redirect } from "react-router-dom";
import ReactModal from "react-modal";
import { Button, Paper, TextField } from "@mui/material";

const LOCAL_STORAGE_KEY = "myAppData";

export default function NoteInfo() {
  const [notes, setNotes] = useContext(NotesContext);
  const [currentNote, setCurrentNote] = useContext(CurrentNote);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const updateRef = useRef();
  const [redirect, setRedirect] = useState(false);
  const { noteName } = useParams();

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storage) setNotes(storage);
    const note = storage.find((note) => note.name === noteName);
    setCurrentNote(note);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  function updateNote(id) {
    const newNotes = [...notes];
    const selectNote = newNotes.find((note) => note.id === id);
    selectNote.text = updateRef.current.value;
    setNotes(newNotes);
  }

  function deleteNote(id) {
    const newNotes = [...notes];
    const modifiedNotes = newNotes.filter((note) => note.id !== id);
    setNotes(modifiedNotes);
  }

  function handleUpdate() {
    updateNote(currentNote.id);
  }

  function handleDelete() {
    deleteNote(currentNote.id);
    setRedirect(true);
  }

  function redirectDelete() {
    if (redirect) {
      return <Redirect to="/" />;
    }
  }

  return (
    <>
      {redirectDelete()}
      <ReactModal isOpen={confirmDelete} className="modal" ariaHideApp={false}>
        <div className="confirm-delete">
          <h1>Are you sure you want to delete this note?</h1>
          <div className="choices">
            <div className="confirmBtn" onClick={handleDelete}>
              Yes
            </div>
            <div className="rejectBtn" onClick={() => setConfirmDelete(false)}>
              No
            </div>
          </div>
        </div>
      </ReactModal>
      <div className="note-info">
        <div className="noteInfoTitle">
          <Button
            onClick={() => setConfirmDelete(true)}
            variant="contained"
            color="warning"
            sx={{
              fontSize: "1.2rem",
              width: { xs: "100px", sm: "150px" },
              height: { xs: "40px", sm: "50px" },
            }}
          >
            Delete
          </Button>
          <Link to="/" className="link">
            <Button
              variant="contained"
              sx={{
                fontSize: "1.2rem",
                width: { xs: "100px", sm: "150px" },
                height: { xs: "40px", sm: "50px" },
              }}
            >
              Back
            </Button>
          </Link>
          <h1>{currentNote.name}</h1>
        </div>
        <Paper sx={{ width: { xs: "90%", md: "95%" } }} elevation={24}>
          <TextField
            multiline
            rows={50}
            inputRef={updateRef}
            name="content"
            variant="outlined"
            color="primary"
            id="updateContent"
            sx={{ width: "100%" }}
            spellCheck="false"
            value={currentNote.text}
            onChange={handleUpdate}
          />
        </Paper>
      </div>
    </>
  );
}
