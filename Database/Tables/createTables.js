const mssql = require ('mssql');
const { sqlConfig } = require('../../Config/config');


const createNotebookTable = async(req, res)=>{
    try {
        const table = `
        BEGIN 
        TRY
            CREATE TABLE notebookTable(
                id VARCHAR(200) PRIMARY KEY,
                noteTitle VARCHAR(500) NOT NULL,
                noteContent VARCHAR(1000) NOT NULL,
                createdAt TIME
            )
        END TRY
    BEGIN   
        CATCH
            THROW 50001, 'Table already Exists!', 1;
        END CATCH`;

    const pool = await mssql.connect(sqlConfig)

    await pool.request().query(table, (err)=>{
        if(err instanceof mssql.RequestError){
            console.log({Error: err.message});
        }else{
            console.log('Table created Successfully');
        }
    })

    } catch (error) {
        return ({Error: error})
    }
}

module.exports = {
    createNotebookTable
}