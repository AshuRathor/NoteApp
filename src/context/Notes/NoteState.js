import NoteContext from "./NoteContext"
import { useState } from "react"

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  const [tempNote, setTempNote] = useState({ etitle: "", edescription: "", etag: "default" })
  const [eId, setEId] = useState("")

  //fetch That note
  const fetchThatNote = (id) => {
    
    let newNOte = notes.filter((i) => { return i._id === id })

    console.log("new note is : ", newNOte)
    { setTempNote({ etitle: newNOte[0].title, edescription: newNOte[0].description, etag: newNOte[0].tag }) }
    setEId(id)
    console.log(tempNote)
  }

  //get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      }
    })
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }
  //add a note
  const addNote = async (title, description, tag) => {
    console.log("Adding a new note")
    //todo:api call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),


      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json()
    // const newNote = JSON.parse(notes.concat(JSON.stringify(json)))
    // console.log("adding a new note: ",(notes.concat(JSON.stringify(json))))
    // setNotes((notes.concat(JSON.stringify(json))))
    getNotes()


    //
    // const note = {
    //   "_id": "63b3c65a09435bf6f634270da8e",
    //   "user": "63b1236d4baf305eb5146883",
    //   "title": title,
    //   "description": description,
    //   "tag": "notes3",
    //   "date": "2023-01-03T06:08:26.979Z",
    //   "__v": 0
    // }
    // setNotes(notes.concat(note))
  }
  //deletenote
  const deleteNote = async (id) => {
    //todo api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, { //this token at the end is id unique for every note
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token') ,
      },
    });
    const json = await response.json()
    console.log(json)



    // console.log("deleting the note with id: ", id)
    const newNote = notes.filter((i) => { return i._id !== id })
    setNotes(newNote)
  }
  // edit note
  const editNote = async (id, title, description, tag) => {
    // const newNote = JSON.parse(JSON.stringify(notes))
    // newNote.filter((i) => {
    //   if(i._id === id){
    //     console.log("insdie the update", i)
    //     i.tag = tag;
    //     i.title = title;
    //     i.description = description
    //   }
    // })

    // setNotes(newNote)

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),


      },
      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json();
    console.log(json)
    getNotes()
  }

  //     const s1 = {
  //         "name": "Ayush",
  //         "class": "2nd"
  //     }
  //      const [state, setState] = useState(s1)
  //     const update =()=>{
  //         setTimeout(() => {
  //             setState({
  //                 "name":"abc",
  //                 "class": "4nd"
  //             })
  //         }, 1000);
  //     }
  return (
    // <NoteContext.Provider value = {state}> {/* whatever you want to provide in the function just put it into the value = {} */}
    // <NoteContext.Provider value = {{state: state,update: update}}> {/* whatever you want to provide in the function just put it into the value = {} */}
    //     {props.children}; {/* always this emmet whenever use whenuser using state, whatever your write inside the context provider will recieve the children */ }
    // </NoteContext.Provider>
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, fetchThatNote, tempNote, setTempNote, eId }}>
      {props.children};
    </NoteContext.Provider>
  )
}

export default NoteState