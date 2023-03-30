import {React, useState, useContext} from 'react'
import NoteContext from '../context/Notes/NoteContext'
const AddNote = (props) => {
    const context = useContext(NoteContext)
    // const {showAlert} = props
    const {addNote} =context
    const [note, setNote] = useState({title: "",description:"",tag:"default"})
    const handleOnClick = (e)=>{
        e.preventDefault()
        addNote(note.title, note.description,note.tag)
        props.showAlert("Note Added Successfully", "success")
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
        <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' minLength={5} required onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" minLength={5} required name='description' onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' onChange={onChange}/>
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={handleOnClick}>Submit</button>
      </form>
      <h1>Your notes</h1>
    </div>
  )
}

export default AddNote