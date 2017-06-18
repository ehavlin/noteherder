import React, { Component } from 'react';
import './App.css';
import Main from './Main'

class App extends Component {
  constructor() {
    super()

    this.state = {
      notes: {},
      currentNote: {},
      isSelected: false,
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

  noteSelected = (note) => {
    const selectedNote = note
    this.setState({ 
      currentNote: note,
      isSelected: true  
    })
  }

  deleteNote = (note) => {
    let notes = {...this.state.notes}
    delete(notes[note.id])
    this.setState({notes})

    this.clearNote()
  }

  clearNote = () => {
    this.setState({ 
      currentNote: {},
      isSelected: false
    })
  }

  render() {
    return (
      <div className="App">
        <Main 
          notes={this.state.notes}
          currentNote={this.state.currentNote} 
          isSelected={this.state.isSelected}
          saveNote={this.saveNote} 
          deleteNote={this.deleteNote} 
          noteSelected={this.noteSelected}
          clearNote={this.clearNote}
        />
      </div>
    );
  }
}

export default App;
