const {v4} = require('uuid')
const mssql = require ('mssql');
const { sqlConfig } = require('../Config/config');


const createNote = async(req, res)=>{
    try {

        const id = v4()

        const {noteTitle, noteContent, createdAt} = req.body

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){

            const result = await pool.request()
            .input('id', mssql.VarChar, id)
            .input('noteTitle', mssql.VarChar, noteTitle)
            .input('noteContent', mssql.VarChar, noteContent)
            .input('createdAt', mssql.Time, createdAt)
            .execute('createNotePROC')



            if(result.rowsAffected == 1){
            return res.json({
                message: "Project created Successfully",
            })  
            }else{
                return res.json({message: "Creation failed"})
            }   
        }
    } catch (error) {
        return res.json({error})
    }
}

const getNotes = async(req, res)=>{
    try {
        const pool = await (mssql.connect(sqlConfig))

        const allnotes = (await pool.request().execute('getAllNotes')).recordset

        res.json({notes: allnotes})
    } catch (error) {
        return res.json({error})
    }
}

const getOneNote = async(req, res)=>{
    try {
        const {id} = req.params

        const pool = await mssql.connect(sqlConfig)

        const note = (await pool.request().input('id', id).execute('getOnenote')).recordset

        return res.json({
            note: project
        })
    } catch (error) {
        return res.json({error})
    }
}

const updateNote = async(req, res)=>{
    try {
        const {id} = req.params

        const {noteTitle, noteContent, createdAt} = req.body

        const pool = await mssql.connect(sqlConfig)

        const result = (await pool.request()
        .input('id', mssql.VarChar, id)
        .input('noteTitle', mssql.VarChar, noteTitle)
        .input('noteContent', mssql.VarChar, noteContent)
        .input('createdAt', mssql.Time, createdAt)

        .execute('updateNote'));

        console.log(result);

        if(result.rowsAffected == 1){
            res.json({
                message: 'project updated successfully'
            })
        }else{
            res.json({
                message: 'project not found'
            })
        }
    } catch (error) {
        return res.json({Error: error})
    }
}

const deleteNote = async (req, res)=>{
    try {
       const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        const result = await pool.request()
        .input('id', id)
        .execute('deleteNote')
      
        if(result.rowsAffected == 1){
            res.json({
                    message: 'Project deleted successfully'
            })
        }else{
            res.json({
                message: 'Project not found'
        })
        }
    } catch (error) {
        return res.json({Error: error})
    }
}

module.exports ={
    createNote,
    updateNote,
    getOneNote,
    getNotes,
    deleteNote
}