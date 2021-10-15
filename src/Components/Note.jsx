import React, { useContext } from "react";
import { NotesContext } from "../Context/NotesContext";
import { Link } from "react-router-dom";
import { Paper, Typography } from "@mui/material";

export default function Note({ note }) {
  const [notes, setNotes] = useContext(NotesContext);

  return (
    <>
      <Link className="note-link" to={`/${note.name}`}>
        <Paper className="note" elevation={24}>
          <Typography
            className="note-title"
            variant="h3"
            sx={{ textAlign: "center", margin: "10px auto" }}
          >
            {note.name}
          </Typography>
          <Typography
            className="note-text"
            variant="h5"
            sx={{
              textAlign: "center",
              width: "100%",
              margin: "auto",
            }}
          >
            {note.text}
          </Typography>
        </Paper>
      </Link>
    </>
  );
}
