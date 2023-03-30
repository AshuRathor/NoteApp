import { React, useContext } from 'react'
import NoteContext from '../context/Notes/NoteContext'

const NoteItem = (props) => {
  const context = useContext(NoteContext)
  const { deleteNote,fetchThatNote } = context
  const { i, updateNote } = props
  return (
    // <div className='row my-3'>
    <div className="card col-md-3 mx-3 my-3" style={{ width: "18rem" }}>
      {/* <img src="" className="card-img-top"/> */}
      <div className="d-flex justify-content-end my-3">
        <i className="far fa-trash-alt mx-2" onClick={() => { deleteNote(i._id);props.showAlert("Deleted Successfully", "success") }}></i>
        <i className="fa-regular fa-pen-to-square mx-2" onClick={() => {fetchThatNote(i._id);updateNote(i) }}></i>
      </div>
      
      <div className="card-body">
        <h5 className="card-title">{i.title}</h5>
        <p className="card-text">{i.description}</p>
        {/* <a href="/" className="btn btn-primary">Read more</a> */}
      </div>
    </div>
    // {/* hellow wolrd */}
    // </div>
  )
}

export default NoteItem