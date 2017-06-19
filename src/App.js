import React, { Component } from 'react'

import './App.css'
import Main from './Main'
import base, { auth } from './base'
import SignIn from './SignIn'
import SignOut from './SignOut'

class App extends Component {
  constructor() {
    super()

    this.state = {
      notes: {},
      currentNote: {},
      isSelected: false,
      uid: null,
    }
  }

  componentWillMount() {
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.authHandler(user)
        } else {
          this.setState({ uid: null })
        }
      }
    )
  }

  syncNotes = () => {
    this.ref = base.syncState(
      `${this.state.uid}/notes`,
      {
        context: this,
        state: 'notes',
      }
    )
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
    notes[note.id] = null
    //delete(notes[note.id])
    this.setState({ notes })

    this.clearNote()
  }

  clearNote = () => {
    this.setState({ 
      currentNote: {},
      isSelected: false
    })
  }

  signIn = () => {
    return this.state.uid
  }

  authHandler = (user) => {
    this.setState(
      { uid: user.uid },
      this.syncNotes
      )
  }

  signOut = () => {
    auth
      .signOut()
      .then(
        () => {
          base.removeBinding(this.ref)
          this.setState({ notes: {} })
        }
      )  
  }

  renderMain = () => {
    const actions = {
      saveNote: this.saveNote,
      deleteNote: this.deleteNote, 
      noteSelected: this.noteSelected,
      clearNote: this.clearNote,
    }

    return (
      <div>
        <SignOut signOut={this.signOut} />
        <Main 
          notes={this.state.notes}
          currentNote={this.state.currentNote} 
          isSelected={this.state.isSelected}
          {...actions}
         />
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        { this.signIn() ? this.renderMain() : <SignIn /> }
      </div>
    );
  }
}

export default App;
