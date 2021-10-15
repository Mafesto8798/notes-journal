import React, { useState, useContext, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { NotesContext } from "../Context/NotesContext";
import ReactModal from "react-modal";
import { Box, Button, Typography, TextField, Paper } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

export default function AddNote() {
  const [notes, setNotes] = useContext(NotesContext);
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef();
  const textRef = useRef();

  function toggleModal() {
    setIsAdding(!isAdding);
  }

  function updateTitle() {
    const input = titleRef.current.value;
    setTitle(input);
  }
  function updateContent() {
    const input = textRef.current.value;
    setContent(input);
  }
  function addNote() {
    const notesCopy = [...notes];
    if (content === "" || title === "") return null;
    if (titleRef.current.value.length > 22) {
      alert("Title can be no longer than 22 characters.");
      return null;
    }
    setNotes([...notesCopy, { id: uuidv4(), name: title, text: content }]);
    setContent("");
    setTitle("");
  }

  if (isAdding)
    return (
      <>
        <ReactModal className="modal" isOpen={isAdding} ariaHideApp={false}>
          <Paper
            className="addingNote"
            elevation={24}
            sx={{ backgroundColor: "#eee" }}
          >
            <Typography variant="h4" color="primary" className="helper-text">
              Max Length = 22 <strong> | </strong> Length = {title.length}
            </Typography>
            <TextField
              id="addNote-title"
              variant="outlined"
              inputRef={titleRef}
              placeholder="Title"
              color="primary"
              value={title}
              spellCheck="false"
              autoComplete="off"
              onChange={updateTitle}
              sx={{ width: { xs: "250px", sm: "80%" }, padding: "5%" }}
            />
            <TextField
              id="textArea"
              minRows={10}
              maxRows={20}
              multiline
              inputRef={textRef}
              name="text"
              placeholder="Write a note..."
              spellCheck="false"
              color="primary"
              value={content}
              onChange={updateContent}
              sx={{
                padding: "5%",
                width: { xs: "250px", sm: "80%" },
              }}
            />
            <div className="options">
              <div className="cancelBtn" onClick={toggleModal}>
                x
              </div>
              <div className="addNote" onClick={addNote}>
                Create Note
              </div>
            </div>
          </Paper>
        </ReactModal>
      </>
    );

  return (
    <Box className="addBtnContainer">
      <Button
        color="primary"
        size="large"
        onClick={toggleModal}
        variant="contained"
        sx={{
          width: { xs: "150px", sm: "220px" },
          height: { xs: "50px", sm: "70px" },
          fontSize: { xs: "1rem", sm: "1.5rem" },
        }}
        startIcon={<CreateIcon />}
      >
        Create Note
      </Button>
    </Box>
  );
}
