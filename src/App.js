import React, { Component } from 'react';
import './App.css';
import Main from './Main'
import base from './base'
import SignIn from './SignIn'
import SignOut from './SignOut'

class App extends Component {
  constructor() {
    super()

    this.state = {
      notes: {},
      currentNote: {},
      isSelected: false,
    }
  }

  componentWillMount() {
    base.syncState(
      'notes',
      {
        context: this,
        state: 'notes',
      }
    )
  }

  signedIn = () => {
    return true
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

  renderMain = () => {
    return (
      <div>
        <SignOut />
        <Main notes={this.state.notes} sveNote={this.saveNOte} />
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        { this.signedIn() ? this.renderMain() : <SignIn /> }
      </div>
    );
  }
}

export default App;
