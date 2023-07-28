const {Router} = require('express')
const { createNote, getNotes, getOneNote, updateNote, deleteNote } = require('../Controllers/notebookControllers')

const notebookRouter = Router()

notebookRouter.post('/', createNote)
notebookRouter.get('/', getNotes)
notebookRouter.get('/:id', getOneNote)
notebookRouter.put('/:id', updateNote)
notebookRouter.delete('/:id', deleteNote)

module.exports = {
    notebookRouter
}