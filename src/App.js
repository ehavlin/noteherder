import React, { Component } from 'react';
import './App.css';
import Main from './Main'

class App extends Component {
  constructor() {
    super()

    this.state = {
      notes: {},
    }
  }

  saveNote = (note) => {
    if (!note.id) {
      note.id = `note-${Date.now()}`
    }
    const notes = {...this.state.notes}
    notes[note.id] = note
    this.setState({ notes })
  }

  noteSelected = (event) => {
    event.preventDefault()
    console.log("I was pressed")
  }

  deleteNote = (note) => {
    let notes = {...this.state.notes}
    delete(notes[note.id])
    this.setState({notes})
  }

  render() {
    return (
      <div className="App">
        <Main notes={this.state.notes} saveNote={this.saveNote} deleteNote={this.deleteNote}/>
      </div>
    );
  }
}

export default App;
