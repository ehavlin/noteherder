import React from 'react'

import './Main.css'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'

const Main = (props) => {
    return (
        <div className="Main">      
            <Sidebar />
            <NoteList 
                notes={props.notes} 
                noteSelected={props.noteSelected}
            />
            <NoteForm {...props} />
        </div>
    )
}

export default Main