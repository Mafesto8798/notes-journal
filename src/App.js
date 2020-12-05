import React,{useState} from 'react';
import NotesList from './Components/NotesList'
import NoteInfo from './Components/NoteInfo'
import {NotesContext} from './Context/NotesContext'
import {CurrentNote} from './Context/CurrentNote'
import {v4 as uuidv4} from 'uuid'
import {BrowserRouter as Router,Route} from 'react-router-dom'

const defaultNotes = [
  {id:uuidv4(),name: "Note to Self",text: "Don't forget to clean the office today!"},
  {id:uuidv4(),name: "Example Note #1",text: "Forget things easily? Want to write down your thoughts? Try taking some notes now!"},
]

function App() {
const [notes,setNotes] = useState(defaultNotes);
const [currentNote,setCurrentNote] = useState({});


  return (
    <Router>
    <NotesContext.Provider value={[notes,setNotes]}>
    <CurrentNote.Provider value={[currentNote,setCurrentNote]}>
    <Route path="/" exact component={NotesList} />
    <Route path="/:noteName" component={NoteInfo} />
    </CurrentNote.Provider>
    </NotesContext.Provider>
    </Router>
  );
}

export default App;
