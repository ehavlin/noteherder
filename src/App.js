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

  componentWillMount(){
   
  }

  syncNotes = () => {
    base.syncState(
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

  signedIn = () => {
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
      .then(this.setState({ uid: null }))  
  }

  renderMain = () => {
    return (
      <div>
        <SignOut signOut={this.signOut} />
        <Main notes={this.state.notes} sveNote={this.saveNOte} />
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        { this.signedIn() ? this.renderMain() : <SignIn authHandler={this.authHandler} /> }
      </div>
    );
  }
}

export default App;
