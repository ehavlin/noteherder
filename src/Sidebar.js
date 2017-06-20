import React from 'react'

import './Sidebar.css'
import quill from './quill.svg'
import newHover from './new-hover.png'
import newIcon from './new.png'

const Sidebar = ({ emptyForm }) => {
    return (
        <nav className="Sidebar">
            <div className="logo">
            <img src={quill} alt="Noteherder" />
            </div>
            <button className="new-note" onClick={() => {emptyForm()}}>
                <img src={newHover} alt="New note" />
                <img className="outline" src={newIcon} alt="New note" />
            </button>
        </nav>
    )
}

export default Sidebar