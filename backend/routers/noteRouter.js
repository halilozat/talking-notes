import express from 'express'
import mongoose from 'mongoose'
const router = express.Router()
import Note from '../models/noteModel.js'

//Get all notes from db

router.get('/', async (req, res) => {
    try {
        const notes = await Note.find()

        res.status(200).json(notes)

        res.json(notes)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

//Get single note from db

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params


        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'Note id is not valid' })

        const note = await Note.findById(id)
        if (!note) return

        res.status(200).json(note)
    } catch (error) {
        res.status(404).json({ message: 'Note not found' })
    }
})

//Create a note

router.post('/', async (req, res) => {
    try {
        const note = req.body

        const createdNote = await Note.create(note)

        res.status(201).json(createdNote)
    } catch (error) {
        console.log(error.message)
        res.json({ message: 'Create note failed' })
    }
})

//Update a note

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
    
        if (!mongoose.Types.ObjectId.isValid(id))
          res.status(404).json({ message: 'Note id is not valid' })
    
        const { title, content, creator, image } = req.body
    
        const updatedNote = await Note.findByIdAndUpdate(
          id,
          { title, content, creator, image, _id: id },
          { new: true }
        )
    
        res.status(200).json(updatedNote)
      } catch (error) {
        console.log(error.message)
        res.json({ message: 'Update failed' })
      }})

//Delete a note

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
    
        if (!mongoose.Types.ObjectId.isValid(id))
          res.status(404).json({ message: 'Note id is not valid' })
    
        await Note.findByIdAndDelete(id)
    
        res.status(200).json({ message: 'Note has been deleted' })
      } catch (error) {
        console.log(error.message)
        res.json({ message: 'Note delete failed' })
      }})

export default router