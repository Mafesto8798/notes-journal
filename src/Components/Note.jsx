import React,{useContext} from 'react'
import {NotesContext} from '../Context/NotesContext'
import {Link} from 'react-router-dom'



export default function Note({note}) {
    const [notes,setNotes] = useContext(NotesContext)
    


    function deleteNote(id){
        const newNotes = [...notes]
        const modifiedNotes = newNotes.filter(note => note.id !== id)
        setNotes(modifiedNotes)
    }


    function handleDelete(){
        deleteNote(note.id)
    }




    return (
        <>
        <div className="note">
        <div className="deleteBtn" onClick={handleDelete}>x</div>
        <Link className="note-link" to={`/${note.name}`}> 
        <div className="note-card">
            <h1 className="title">{note.name}</h1>
        </div>
        </Link>
        </div>
        </>
    )
}


