import React,{useContext,useEffect,useRef, useState} from 'react'
import {NotesContext} from '../Context/NotesContext'
import {CurrentNote} from '../Context/CurrentNote'
import {useParams,Link,Redirect} from 'react-router-dom'
import ReactModal from 'react-modal';

const LOCAL_STORAGE_KEY = 'myAppData'

export default function NoteInfo() {
    const [notes,setNotes] = useContext(NotesContext)
    const [currentNote,setCurrentNote] = useContext(CurrentNote)
    const [confirmDelete,setConfirmDelete] = useState(false);
    const updateRef = useRef()
    const [redirect,setRedirect] = useState(false)
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

    function deleteNote(id){
        const newNotes = [...notes]
        const modifiedNotes = newNotes.filter(note => note.id !== id)
        setNotes(modifiedNotes)
    }
    
    function handleUpdate(){
        updateNote(currentNote.id)
    }

    function handleDelete(){
        deleteNote(currentNote.id)
        setRedirect(true)
    }

    function redirectDelete(){
        if(redirect){
            return <Redirect to="/" />
        }
    }

    return (
        <>
        <div className="deleteBtn" onClick={() => setConfirmDelete(true)}>Delete Note</div>
        {redirectDelete()}
        <ReactModal
        isOpen={confirmDelete}
        className="modal"
        ariaHideApp={false}
        >
                <div className="confirm-delete">
                    <h1>Are you sure you want to delete this note?</h1>
                    <div className="choices">
                        <div className="confirmBtn" onClick={handleDelete}>Yes</div>
                        <div className="rejectBtn" onClick={() => setConfirmDelete(false)}>No</div>
                    </div>
                </div>
        </ReactModal>  
        <div className="note-info">
            <div className="noteInfoTitle">
            <Link to="/" className="backBtn">Back</Link>
            <h1>{currentNote.name}</h1>
            </div>
            <textarea ref={updateRef} name="content" id="updateContent" spellCheck="false" value={currentNote.text} onChange={handleUpdate} />
        </div>
        </>
    )
}
