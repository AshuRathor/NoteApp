import { React, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/Notes/NoteContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = (props) => {

  const context = useContext(NoteContext)
  let history = useNavigate()
  const { notes, getNotes, tempNote, setTempNote, editNote, eId } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
      console.log(localStorage.getItem('token'))
    }
    else{
      console.log("Inside the else")
      console.log(localStorage.getItem('token'))
      history("/login")
    }
  }, [])
  
  // const [updateNoteValue, setUpdateNoteValue] = useState([{title: "mudda",description:"",tag:"default"}])
  const updateNote = (note) => {
    ref.current.click()
    
  }
const [note, setNote] = useState({title: "",description:"",tag:"default"})
const handleOnClickUpdate = (e)=>{
  e.preventDefault()
  editNote(eId, tempNote.etitle, tempNote.edescription, tempNote.etag )
  refClose.current.click()
  props.showAlert("Note updated successfully", "success")

}

const onChange=(e)=>{
  setTempNote({...tempNote, [e.target.name]: e.target.value})
  }
  const ref = useRef(null)
  const refClose = useRef(null)

  return (
    <>
      <AddNote showAlert = {props.showAlert} />
      <button type="button"  ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> button </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"> modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">title</label>
                  <input type="text" value={tempNote.etitle} minLength={5} required  className="form-control" id="title" name='etitle' onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" value={tempNote.edescription} minLength={5} required className="form-control" id="edescription" name='edescription' onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" value={tempNote.etag} className="form-control" id="etag" name='etag' onChange={onChange} />
                </div>
              <button type="button" className="btn btn-primary" onClick={handleOnClickUpdate}>Update changes</button>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your notes</h2>
        <div className="container">
          {notes.length === 0 && `No notes to display`}
        </div>
        {notes.map((i) => {
          return <NoteItem i={i} showAlert = {props.showAlert} updateNote = {updateNote} key={i._id} />
        })}
      </div>
    </>
  )
}

export default Notes