const express = require("express")
const router = express.Router()
var fetchuser = require("../middleware/fetchuser")
const Notes = require("../models/notes")
const { body, validationResult } = require('express-validator');
const user = require("../models/user");

//Route 1: get all the notes using: GET " /api/auth/getuser" login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

})


// route 2: add a new note using: POST "/api/notes/addnote" login required
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 2 }),
    body('description', "Description must have atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body

        //if there are errors, return bad request and the errors
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }

})

//route 3: update an existing note using : put "/api/notes/updatenote"

router.put("/updatenote/:id",
    fetchuser,
    // [ body("title", "Enter a valid title").isLength({min:3}),
    //     body("description", "description must be atleast 5 letters").isLength({min: 5}),], 
    async (req, res) => {
        const { title, description, tag } = req.body
        try {
            //create a new note object
            const newNote = {}
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }

            //find the note to be updated and update it
            let note = await Notes.findById(req.params.id)
            if (!note) { return res.status(404).send("Not found") }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed")
            }
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({ note })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error")
        }

    })

//route 4: delete an existing note using : delete "/api/notes/deletenote"

router.delete("/deletenote/:id",
    fetchuser,
    // [ body("title", "Enter a valid title").isLength({min:3}),
    //     body("description", "description must be atleast 5 letters").isLength({min: 5}),], 
    async (req, res) => {
        try {
            //find the note to be deleted and delete it
            let note = await Notes.findById(req.params.id)
            if (!note) { return res.status(404).send("Not found") }

            //allow deletion only if user owns this note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed")
            }
            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({ "success": "Note has been deleted", note: note })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error")
        }



    })

module.exports = router