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
    END CATCH
