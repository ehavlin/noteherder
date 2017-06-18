import React from 'react'

import './NoteList.css'
import Note from './Note'

const NoteList = ({ notes }) => {
    return (
        <div className="NoteList">
            <h3>Notes</h3>
            <ul id="notes">
                {Object.keys(notes).map((noteId) => {
                    return <Note note={notes[noteId]} key={noteId} noteSelected={this.noteSelected} />
                })}
            </ul>
        </div>
    )
}

export default NoteList