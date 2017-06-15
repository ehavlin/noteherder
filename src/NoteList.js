import React from 'react'

import NoteForm from './NoteForm'
import './NoteList.css'

const noteData = [
    {
    title: "Citizens of distant epochs",
    body: "Sea of Tranquility the ash of stellar alchemy vastness is bearable only through love bits of moving fluff are creatures of the cosmos, consciousness a still more glorious dawn awaits two ghostly white figures in coveralls and helmets are soflty dancing tingling of the spine, concept of the number one brain is the seed of intelligence are creatures of the cosmos?",
  },
  {
    title: "Preserve and cherish that pale blue dot",
    body: "network of wormholes a billion trillion the only home we've ever known light years dream of the mind's eye. Intelligent beings!",
  },
  {
    title: "Laws of physics",
    body: "Cambrian explosion radio telescope, circumnavigated citizens of distant epochs brain is the seed of intelligence two ghostly white figures in coveralls and helmets are soflty dancing galaxies inconspicuous motes of rock and gas",
  },
]

function DisplayNotes(props) {
    return (
        <li>
            <div className="note">
                <div className="note-title">
                    {props.note.title}
                </div>
                <div className="note-body">
                    <p>
                        {props.note.body}
                    </p>
                </div>
            </div>
        </li>
    )
}

const NoteList = () => {
    return (
        <div className="NoteList">
            <h3>Notes</h3>
            <ul id="notes">
                {noteData.map((note, i) => <DisplayNotes key={i} note={note} />)}
            </ul>
        </div>
    )
}

export default NoteList