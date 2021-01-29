import React,{useContext} from 'react'
import {NotesContext} from '../Context/NotesContext'
import {Link} from 'react-router-dom'



export default function Note({note}) {
    const [notes,setNotes] = useContext(NotesContext)

    return (
        <>
        <div className="note">
        <Link className="note-link" to={`/${note.name}`}> 
        <div className="note-card">
            <p className="preview-text">{note.text}</p>
        </div>
        <h1 className="title">{note.name}</h1>
        </Link>
        </div>
        </>
    )
}


