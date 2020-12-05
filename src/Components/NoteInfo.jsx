import React,{useContext,useEffect,useRef} from 'react'
import {NotesContext} from '../Context/NotesContext'
import {CurrentNote} from '../Context/CurrentNote'
import {useParams} from 'react-router-dom'

const LOCAL_STORAGE_KEY = 'myAppData'

export default function NoteInfo() {
    const [notes,setNotes] = useContext(NotesContext)
    const [currentNote,setCurrentNote] = useContext(CurrentNote)
    const updateRef = useRef()
    const {noteName} = useParams()


    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if(storage) setNotes(storage)
        const note = storage.find(note => note.name === noteName)
        setCurrentNote(note)
    },[])

    
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes))
    },[notes])



    function updateNote(id){
        const newNotes = [...notes]
        const selectNote = newNotes.find(note => note.id === id)
        selectNote.text = updateRef.current.value;
        setNotes(newNotes)
    }
    
    function handleUpdate(){
        updateNote(currentNote.id)
    }

    return (
        <div className="note-info">
            <div className="noteInfoTitle">
            <h1>{currentNote.name}</h1>
            </div>
            <textarea ref={updateRef} name="content" id="updateContent" spellCheck="false" value={currentNote.text} onChange={handleUpdate} />
        </div>
    )
}
