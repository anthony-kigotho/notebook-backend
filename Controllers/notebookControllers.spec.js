import mssql from 'mssql'
import { describe } from 'node:test'
import { createNote, deleteNote, getNotes, getOneNote, updateNote } from './notebookControllers'

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}


describe("Notes Controller", ()=>{

    describe("Create a note", ()=>{
        it("should throw an error 'Input all values' if noteTitle, noteContent or createdAt is missing", async()=>{
            const req =  {
                    body: {
                        
                    }
                }
            

            await createNote(req, res);
            expect(res.json).toHaveBeenCalledWith({
                Error: "Input all values"           
            })
        })

        it("should create a note successfully", async()=>{
            
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                connected: true,
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            })
            const req =  {
                    body: {
                        noteTitle: "Note 1",
                        noteContent: "This is the note content",
                        createdAt: "2023-06-05 04:38:56.157"
                    }
                }
            

            await createNote(req, res);
            expect(res.json).toHaveBeenCalledWith({
                message: "Note created Successfully"            
            })
        })
    })

    describe("Gets all notes", ()=>{
        it("should return all notes" , async()=>{
            const mockNotes = [
                {
                    "noteTitle": "Note 1",
                    "noteContent": "This is the note 1 content",
                    "createdAt": "2023-06-05 04:38:56.157"
                },
                {
                    "noteTitle": "Note 2",
                    "noteContent": "This is the note 2 content",
                    "createdAt": "2023-06-10 01:38:56.157"
                }
            ]

            const req = {}

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: mockNotes
                })
            })

            await getNotes(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({notes: mockNotes})
        })
    })

    describe("Getting note By ID", ()=>{
        it ("should return the specified note", async()=>{
            const projectID = '1464dda6-5651-4d3c-8c1c-527d977e15d8'
            const mockNote = {
                id: "1464dda6-5651-4d3c-8c1c-527d977e15d8",
                noteTitle: "Note 1",
                noteContent: "This is the note content",
                createdAt: "2023-06-05 04:38:56.157"
            }

            const req = {
                params: {
                    id: projectID
                }
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: [mockNote]
                })
            })

            await getOneNote(req, res)

            expect(res.json).toHaveBeenCalledWith({note: [mockNote]})
        })

    })

    describe("Updating a note", ()=>{
        it("should update a note successfully", async()=>{
            const noteID = '1464dda6-5651-4d3c-8c1c-527d977e15d8'
            const updatednote = {
                id: "1464dda6-5651-4d3c-8c1c-527d977e15d8",
                noteTitle: "Note 1 update title",
                noteContent: "This is the note content",
                createdAt: "2023-06-05 04:38:56.157"
            }
            const req = {
                params:{
                    id:noteID
                },
                body: updatednote
            }
            
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            })

            await updateNote(req, res)

            expect(res.json).toHaveBeenCalledWith({
                message: "Note updated successfully"
            })
        })

        
        it("should return error when noteID does not exist", async ()=>{
            const noteID = '1464dda6-5651-4d3c-8c1c-527d977e15d8'
            const updatednote = {
                id: "1464dda6-5651-4d3c-8c1c-527d977e15d8",
                noteTitle: "Note 1 update title",
                noteContent: "This is the note content",
                createdAt: "2023-06-05 04:38:56.157"
            }
            const req = {
                params:{
                    id:noteID
                },
                body: updatednote
            }
            
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [0]
                })
            })

            await updateNote(req, res)

            expect(res.json).toHaveBeenCalledWith({
                message: 'Note not found'
            })
        }) 
    })


    describe("Deleting a note", ()=>{
        it("should delete the note successfully", async()=>{
            const noteID = '1464dda6-5651-4d3c-8c1c-527d977e15d8'
            const req = {
                params:{
                    id: noteID
                }
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            })

            await deleteNote(req, res)

            expect(res.json).toHaveBeenCalledWith({
                message: 'Note deleted successfully'
            })
        })

        it("should return an error 'note not found'", async()=>{
            const noteID = '1464dda6-5651-4d3c-8c1c-527d977e15d8'
            const req = {
                params:{
                    id: noteID
                }
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [0]
                })
            })

            await deleteNote(req, res)


            expect(res.json).toHaveBeenCalledWith({
                message: 'Note not found'
            })
        })
    })
})