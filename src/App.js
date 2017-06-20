import React, { Component } from 'react'

import './App.css'
import Main from './Main'
import base, { auth } from './base'
import SignIn from './SignIn'

class App extends Component {
  constructor() {
    super()

    this.state = {
      notes: {},
      uid: null,
      currentNote: this.blankNote(),
    }
  }

  componentWillMount() {
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          // finished signing in
          this.authHandler(user)
        } else {
          // finished signing out
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
    this.setState({ notes, currentNote: note })
  }

  blankNote = () => {
    return {
      id: null,
      title: '',
      body: '',
    }
  }

  resetCurrentNote = () => {
    this.setCurrentNote(this.blankNote())
  }

  deleteNote = (note) => {
    const notes = {...this.state.notes}
    notes[note.id] = null
    this.setState(
      { notes },
      this.resetCurrentNote()
    )
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
          this.resetCurrentNote()
          this.setState(
            { notes: {}, 
            currentNote: this.blankNote()
        })
        }
      )  
  }

  setCurrentNote = (note) => {
    this.setState({ currentNote: note })
  }

  renderMain = () => {
    const actions = {
      saveNote: this.saveNote,
      deleteNote: this.deleteNote, 
      setCurrentNote: this.setCurrentNote,
      resetCurrentNote: this.resetCurrentNote,
      signOut: this.signOut,
    }

    return (
      <div>
        <Main 
          notes={this.state.notes}
          currentNote={this.state.currentNote} 
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
