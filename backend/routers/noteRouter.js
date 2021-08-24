import express from 'express'

const router = express.Router()

//Get all notes from db

router.get('/', async (req, res) => {
  res.json({ message: 'get all notes from database' })
})

//Get single note from db

router.get('/:id', async (req, res) => {
  res.json({ message: 'get single note from database' })
})

//Create a note

router.post('/', async (req, res) => {
  res.json({ message: 'create a note' })
})

//Update a note

router.put('/:id', async (req, res) => {
  res.json({ message: 'update a note' })
})

//Update a note

router.delete('/:id', async (req, res) => {
  res.json({ message: 'delete a note' })
})

export default router