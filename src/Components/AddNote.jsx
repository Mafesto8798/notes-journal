import React,{useState,useContext,useRef} from 'react'
import {v4 as uuidv4} from 'uuid';
import {NotesContext}from '../Context/NotesContext'



export default function AddNote() {
    const [notes,setNotes] = useContext(NotesContext)
    const [isAdding,setIsAdding] = useState(false)
    const[title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const titleRef = useRef();
    const textRef = useRef();

function handleInput(){
    setIsAdding(true)
}
function handleCancel(){
    setTitle('')
    setContent('')
    setIsAdding(false)
}

function updateTitle(){
    const input = titleRef.current.value
    setTitle(input);
}
function updateContent(){
    const input = textRef.current.value
    setContent(input)
}
function addNote(){
    const notesCopy = [...notes]
    if(content === '' || title === '') return null
    if(titleRef.current.value.length > 22){
        alert('Title can be no longer than 22 characters.')
        return null
    }
    setNotes([...notesCopy,{id:uuidv4(),name:title,text:content}])
    setContent('')
    setTitle('')
}

    if(isAdding) return(
        <>
        <div className="addingNote">
        <p>Length - {title.length}</p>
        <input ref={titleRef} type="text" name="title" placeholder="Title" value={title} spellCheck='false' autoComplete='off' onChange={updateTitle}/>
        <textarea ref={textRef} name="text" id="addContent" placeholder="Write a note..." spellCheck="false" value={content} onChange={updateContent}></textarea>
        <div className="options">
            <div className="cancelBtn" onClick={handleCancel}>x</div>
            <div className="addNote" onClick={addNote}>Create Note</div>
        </div>
        </div>
        </>
    )

    return (
        <div className="addBtnContainer">
            <div id="addBtn"onClick={handleInput}>+</div>
        </div>
    )
}
