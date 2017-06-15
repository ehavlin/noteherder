import React, { Component } from 'react'

import './NoteForm.css'

class NoteForm extends Component {
    render() {
        return (
                <div className="NoteForm">
                    <form>
                        <p>
                            <input 
                                type="text" 
                                name="title" 
                                placeholder="Title your note" 
                                value="" />
                        </p>
                        <p>
                            <textarea 
                                name="body" 
                                placeholder="Just start typing..." 
                                value="">
                            </textarea>
                        </p>
                    </form>
                </div>
                )
    }
}

export default NoteForm
    
    
    
//     constructor() {
//         super()

//         this.state = {
//             title: '',
//             body: '',
//         }

//         this.updateBody = this.updateBody.bind(this)
//     }

//     updateBody(event) {
//         this.setState({
//             body: event.target.value
//         })
//     }

//     addNote(event) {
//         event.preventDefault()
//         const title = this.titleInput.value
//         const body = this.state.body
//         //Have to push these values onto array in NoteList
//     }

//     render() {
//         return (
//                 <div className="NoteForm">
//                     <form>
//                     <p>
//                         <input type="text" name="title" placeholder="Title your note" ref={input => this.titleInput = input} />
//                     </p>
//                     <p>
//                         <textarea name="body" cols="30" rows="10" placeholder="Just start typing..." value={this.state.body} onChange={this.updateBody}></textarea>
//                     </p>
//                     </form>
//                     <button onClick={this.addNote.bind(this)} className="button">Submit Note</button>
//                 </div>
//                 )
//     }
// }

// export default NoteForm