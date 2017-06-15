import React, { Component } from 'react'

import './NoteForm.css'

class NoteForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            note: this.blankNote()
        }
    }

    blankNote = () => {
        return {
            id: null,
            title: '',
            body: '',
        }
    }

    handleChanges = (event) => {
        const note = {...this.state.note}
        note[event.target.name] = event.target.value
        this.setState(
            { note }, 
            () => this.props.saveNote(this.state.note)
        )    
    }

    render() {
        return (
                <div className="NoteForm">
                    <form>
                        <p>
                            <input 
                                type="text" 
                                name="title" 
                                placeholder="Title your note" 
                                value={this.state.note.title}
                                onChange={this.handleChanges} 
                            />
                        </p>
                        <p>
                            <textarea 
                                name="body" 
                                placeholder="Just start typing..." 
                                value={this.state.note.body}
                                onChange={this.handleChanges}
                            ></textarea>
                        </p>
                    </form>
                </div>
                )
    }
}

export default NoteForm