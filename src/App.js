import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

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
    this.getUserFromLocalStorage
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

  getUserFromLocalStorage() {
    const uid = localStorage.getItem('uid')
    if (!uid) return
    this.setState({ uid })
  }

  syncNotes = () => {
    this.ref = base.syncState(
      `notes/${this.state.uid}`,
      {
        context: this,
        state: 'notes',
      }
    )
  }

  stopSyncing = () => {
    if (this.ref) {
      base.removeBinding(this.ref)
    }
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

  signedIn = () => {
    return this.state.uid
  }

  authHandler = (user) => {
    localStorage.setItem('uid', user.id)
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
          this.stopSyncing()
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

  render() {
    const actions = {
      saveNote: this.saveNote,
      deleteNote: this.deleteNote, 
      setCurrentNote: this.setCurrentNote,
      resetCurrentNote: this.resetCurrentNote,
      signOut: this.signOut,
    }

    const noteData = {
      notes: this.state.notes,
      currentNote: this.state.currentNote,
    }

    return (
      <div className="App">
        <Switch>
          <Route path="/notes" render={() => (
            this.signedIn()
              ? <Main
                  {...noteData}
                  {...actions}
                />
              : <Redirect to="/sign-in" />
          )} />
          <Route path="/sign-in" render={() => (
            !this.signedIn()
              ? <SignIn />
              : <Redirect to="/notes" />
          )} />
          <Route render={() => <Redirect to="/notes" />} />
        </Switch>
      </div>
    )
  }
}

export default App;
