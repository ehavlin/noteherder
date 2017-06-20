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
      currentNoteId: null,
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
      this.noteSelected(note.id)
    }
    const notes = {...this.state.notes}
    notes[note.id] = note
    this.setState({ notes })
  }

  noteSelected = (noteId) => {
    this.setState({ currentNoteId: noteId })
  }

  deleteNote = (note) => {
    let notes = {...this.state.notes}
    notes[note.id] = null
    this.setState({ notes })
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

  emptyForm = () => {
    console.log('hello')
    const note = {
      id: null,
      title: '',
      body: '',
    }
    this.saveNote(note)
  }

  renderMain = () => {
    const actions = {
      saveNote: this.saveNote,
      deleteNote: this.deleteNote, 
      noteSelected: this.noteSelected,
      emptyForm: this.emptyForm,
    }

    return (
      <div>
        <SignOut signOut={this.signOut} />
        <Main 
          notes={this.state.notes}
          currentNoteId={this.state.currentNoteId} 
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
