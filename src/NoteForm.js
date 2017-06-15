import React, { Component } from 'react'

import './NoteForm.css'

class NoteForm extends Component {
    render() {
        return (
                <div className="NoteForm">
                    <form>
                        <p>
                            <input 
                                type="text" 
                                name="title" 
                                placeholder="Title your note" 
                                value="" />
                        </p>
                        <p>
                            <textarea 
                                name="body" 
                                placeholder="Just start typing..." 
                                value="">
                            </textarea>
                        </p>
                    </form>
                </div>
                )
    }
}

export default NoteForm