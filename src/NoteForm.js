import React, { Component } from 'react'

import './NoteForm.css'

class NoteForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            note: this.blankNote()
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const newId = nextProps.currentNoteId
        if (newId !== this.state.note.id){
            this.setState({ note: nextProps.notes[newId] })
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

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ note: this.blankNote() })
  }

    deleteNote = (event) => {
        this.props.deleteNote(this.state.note)
        this.setState({ note: this.blankNote() })
    }

    render() {
        return (
                <div className="NoteForm">
                    <form onSubmit={this.handleSubmit}>
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
                        <button type="button" onClick={this.deleteNote}><i className="fa fa-trash-o"></i></button>
                    </form>
                </div>
                )
    }
}

export default NoteForm