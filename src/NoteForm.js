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
        if (!this.props.isSelected) {
            const note = {...this.state.note}
            note[event.target.name] = event.target.value
            this.setState(
                { note }, 
                () => this.props.saveNote(this.state.note)
            )  
        }
        else {
            const note = this.props.currentNote
            note[event.target.name] = event.target.value
            this.setState(
                { note }, 
                () => this.props.saveNote(this.state.note)
            )  
        }
          
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState(
            { note: this.blankNote() },
            () => this.props.clearNote()
        )
    }

    deleteNote = (event) => {
        event.preventDefault()
        if (!this.props.isSelected) {
            const note = {...this.state.note}
            this.props.deleteNote(note)
            this.setState({ note: this.blankNote() })
        }
        else {
            const note = this.props.currentNote
            this.props.deleteNote(note)
            this.setState({ note: this.blankNote() })
        }
    }

    render() {
        return (
                <div className="NoteForm">
                    {console.log(this.props.isSelected)}
                    <form onSubmit={this.handleSubmit}>
                        <p>
                            <input 
                                type="text" 
                                name="title" 
                                placeholder="Title your note" 
                                value={(!this.props.isSelected) ? this.props.currentNote.title : this.state.note.title}
                                onChange={this.handleChanges} 
                            />
                        </p>
                        <p>
                            <textarea 
                                name="body" 
                                placeholder="Just start typing..." 
                                value={(!this.props.isSelected) ? this.props.currentNote.body : this.state.note.body}
                                onChange={this.handleChanges}
                            ></textarea>
                        </p>
                        <button type="submit">Save note</button>
                        <button type="button" onClick={this.deleteNote}>Delete</button>
                    </form>
                </div>
                )
    }
}

export default NoteForm